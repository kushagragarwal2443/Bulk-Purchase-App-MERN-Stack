const mongoose = require('mongoose');

let User = new mongoose.Schema({
    type: {
        type: String
    },
    username: {
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