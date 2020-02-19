const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//Adding login feature
userRoutes.route('/login').post(function(req, res) {
    let user = req.body;
    User.find({username: `${user.username}`, password: `${user.password}`}, function(err, users){
        return res.json(users);    
    });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});


//Adding features for the second database, i.e, Product

let Product = require('./models/product');


// Add Product
userRoutes.route('/vendor/add').post(function(req, res) {
    let product = new Product(req.body);
    console.log(req.body)
    product.save()
        .then(user => {
            res.status(200).json({'Product': 'Product added'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Get products
userRoutes.route('/vendor/product').post(function(req, res) {
    let product=req.body
    Product.find({username: `${product.username}`, quantity: {$ne: `${product.quantity}`}, status: `${product.status}`  },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// List of Dispatch products
userRoutes.route('/vendor/dispatch').post(function(req, res) {
    let product=req.body
    Product.find({username: `${product.username}`, quantity: {$ne: `${product.quantity}`}, status: `${product.status}` },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// List of Dispatched products
userRoutes.route('/vendor/dispatched').post(function(req, res) {
    let product=req.body
    Product.find({username: `${product.username}`, quantity: {$ne: `${product.quantity}`}, status: `${product.status}` },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Cancelling product
userRoutes.route('/vendor/product_cancel').post(function(req, res) {
    let product=req.body
    Product.updateOne({username: `${product.username}`, quantity: {$ne: `${product.quantity}`}, status: `${product.status}` }, { $set: {status: "Cancelled"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Dispatching product
userRoutes.route('/vendor/dispatch_disp').post(function(req, res) {
    let product=req.body
    Product.updateOne({username: `${product.username}`, quantity: {$ne: `${product.quantity}`}, status: `${product.status}`}, { $set: {status: "Dispatched"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});



//I do not understand this

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
