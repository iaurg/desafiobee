var models = require('./models/index');

module.exports = function(router) {

    router.route('/messages')
        .get(function(req, res) {
          models.Message.findAll({}).then(function(messages) {
            res.json(messages);
          });
        })

        .post(function(req, res) {
          models.Message.create({
            message: req.body.message
          }).then(function(message) {
            res.json(message);
          });
        });

    router.route('/messages/:id')
        .get(function(req, res) {
          models.Message.find({
            where: {
              id: req.params.id
            }
          }).then(function(message) {
            res.json(message);
          });
        })

        .put(function(req, res) {
          models.Message.find({
            where: {
              id: req.params.id
            }
          }).then(function(message) {
            if(message){
              message.updateAttributes({
                message: req.body.message,
              }).then(function(message) {
                res.send(message);
              });
            }
          });
        })

        .delete(function(req, res) {
          models.Message.destroy({
            where: {
              id: req.params.id
            }
          }).then(function(message) {
            res.json(message);
          });
        });
};
