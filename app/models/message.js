var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    message: {type : String, default: ''}
});
