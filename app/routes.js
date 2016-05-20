var Message = require('./models/message');

module.exports = function(app) {
    app.get('/api/messages', function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);

            res.json(messages);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
};
