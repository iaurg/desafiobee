var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var router         = express.Router();
var jwtConfig      = require('./config/jwt');
var server         = require('http').Server(app);
var io             = require('socket.io')(server);
var _              = require('lodash');

var port = process.env.PORT || 8080;

app.set('jwtSecret', jwtConfig.secret);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);

require('./app/routes')(app, router, io);
app.get('*', function(req, res) { res.sendfile('./public/views/index.html'); });

server.listen(port);

console.log('Server on-line on:', 'localhost:' + port);

exports = module.exports = app;
