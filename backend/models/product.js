const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    status: {
        type: String
    },
    price: {
        type: Number
    },
    name: {
        type: String
    },
    username: {
        type: String
    },  
    
    quantity: {
        type: Number
    }    
});

module.exports = mongoose.model('Product', Product,'product');