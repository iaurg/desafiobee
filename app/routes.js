var models       = require('./models/index');
var jwt          = require('jsonwebtoken');
var passwordHash = require('password-hash');
var parse        = require('parse-bearer-token');
var _            = require('lodash');

module.exports = function(app, router, io) {

  var socketList = [];

  function onlineList() {
    io.sockets.emit('online', _.transform(socketList, function(result, s) {
      result.push(s.user.id);
    }, []));
  }

  io.on('connection', function(socket){
    socket.on('connection-user', function(user) {
      console.log(user.name, 'conectado');
      socketList.push({
        user: user,
        socket: socket
      });

      onlineList();
    });

    socket.on('disconnect', function(){
      console.log(user.name, 'desconectado');
      _.remove(socketList, function(s) {
        return s.socket.id === socket.id;
      });

      onlineList();
    });

    socket.on('manual-disconnect', function(userId){
      console.log(user.name, 'desconectado');
      _.remove(socketList, function(s) {
        return s.user.id === userId;
      });

      onlineList();
    });
  });

  /**
   * Authenticate
   */
  router.post('/authenticate', function(req, res) {
    models.User.find({
      where: {
        username: req.body.username
      }
    }).then(function(user) {
      if (!user) {
        res.json({ error: true, message: 'Usuário não encontrado.' });
      } else if (user) {
        if (!passwordHash.verify(req.body.password, user.password)) {
          res.json({ error: true, message: 'Senha incorreta.' });
        } else {
          var token = jwt.sign(user.toJSON(), app.get('jwtSecret'), {
            expiresIn: '1d'
          });

          res.json({
            success: true,
            user: user,
            token: token
          });
        }
      }
    });
  });

  router.get('/authenticate/user', function(req, res) {
    var token = parse(req);

    if (token) {
      jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
        if (err) {
          return res.status(403).json({ error: true });
        } else {
          var user = decoded;
          delete user.iat;
          delete user.exp;

          return res.json({user: user});
        }
      });
    } else {
      return res.status(403).json({ error: true });
    }
  });

  /**
   * New user
   */
  router.route('/users')
    .get(function(req, res) {
      models.User.findAll({}).then(function(users) {
        res.json(users);
      });
    })

    .post(function(req, res) {
      models.User.create({
        name: req.body.name,
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(function(user) {
        res.json(user);
      }).catch(function (err) {
        if (err.statusCode) {
          res.status(err.statusCode);
        } else {
          res.status(500);
        }
        res.json({'error': true, message: 'Esse usuário já existe'});
      });
    });

  /**
   * JWT Middleware
   */
  router.use(function(req, res, next) {
    var token = parse(req);

    if (token) {
      jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
        if (err) {
          return res.status(403).json({ error: true });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({ error: true });
    }
  });

  router.route('/messages')
    .get(function(req, res) {
      models.Message.findAll({}).then(function(messages) {
        res.json(messages);
      });
    })

    .post(function(req, res) {
      models.Message.create({
        message: req.body.message,
        ChannelId: req.body.channelId,
        ToUserId: req.body.toUserId,
        UserId: req.decoded.id
      }).then(function(message) {
        models.Message.findById(message.id, { include: [{ model: models.User, attributes: ['name'] }] }).then(function(message) {
          res.json(message);
          if (message.ChannelId) {
            io.sockets.emit('message', message);
          } else {
            console.log(req.decoded.id, 'para', req.body.toUserId, socketList);

            var fromUser = _.find(socketList, function(s) { return s.user.id === req.decoded.id });
            var toUser   = _.find(socketList, function(s) { return s.user.id === req.body.toUserId });
            if (fromUser) fromUser.socket.emit('message', message);
            if (toUser)   toUser.socket.emit('message', message);
          }
        });
      });
    });

  router.route('/channels')
    .get(function(req, res) {
      models.Channel.findAll({}).then(function(channels) {
        res.json(channels);
      });
    })

    .post(function(req, res) {
      models.Channel.create({
        name: req.body.name
      }).then(function(channel) {
        res.json(channel);
        io.sockets.emit('channel', channel);
      }).catch(function (err) {
        if (err.statusCode) {
          res.status(err.statusCode);
        } else {
          res.status(500);
        }
        res.json({'error': true, message: 'Esse canal já existe'});
      });
    });

  router.route('/channels/:id/messages')
    .get(function(req, res) {
      models.Channel.findById(req.params.id).then(function(channel) {
        channel.getMessages({ order: [['createdAt', 'DESC']], limit: 50, include: [{ model: models.User, attributes: ['name'] }] }).then(function(messages) {
          res.json(messages);
        });
      });
    });

  router.route('/users/:id/messages')
  .get(function(req, res) {
    models.Message.findAll({
      where: {
        $or: [
          {
            UserId: req.params.id,
            ToUserId: req.decoded.id
          },
          {
            UserId: req.decoded.id,
            ToUserId: req.params.id
          }
        ]
      },
      order: [['createdAt', 'DESC']],
      limit: 50
    }).then(function(messages) {
      res.json(messages);
    });
  });
};
