var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var router         = express.Router();

// Just for debugging
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

var port = process.env.PORT || 8880;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);

require('./app/routes')(router);
app.get('*', function(req, res) { res.sendfile('./public/views/index.html'); });
app.listen(port);

console.log('Server on-line :D');

exports = module.exports = app;
