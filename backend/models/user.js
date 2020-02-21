const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    
    type: {
        type: String
    },

    password: {
        type: String
    },

    email: {
        type: String
    }
});

module.exports = mongoose.model('User', User);