const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();


let User = require('./models/user');//database added 
let bcrypt = require('bcrypt');

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
    // let user = req.body;
    // console.log("hi")
    User.findOne({username: req.body.username}).then(user => {
        if(!user){
            // console.log("hey")
            res.status(400).send({"message": "User not found"});
        }
        else{
            // console.log("I am there")
            // console.log(req.body.password)
            // console.log(user.password)
            // console.log(req.body.password.localeCompare(user.password))
            //bcrypt.compare(req.body.password, user.password, (err,result) => {
            if(req.body.password == user.password)
            {
                // console.log("hi1")
                // console.log(res.json(user))
                return res.json(user);
            }
            else{
                // console.log("hi2")
                res.status(400).send({"message": "User log in not successful"});
            }
            //     console.log(result)
            //     if(result) {
            //         // if(err)
            //         // {
            //         //     console.log("I am there2")
            //         //     res.status(400).send({"message":"User couldnt be logged in"})
            //         // }
            //         // else{
            //         //     console.log("I am there3")
            //         //     return res.json(user)
            //         // }
            //         user.save().then((user, err) => {
            //             console.log("I am there2")
            //             if(err) res.status(400).send({"message": "User could not be logged in"})
            //             else {
            //                 console.log("I am there3")
            //                 return res.json(user);
            //             }
            //         })
            //     }
            //     else{
            //         console.log("I am there4")
            //         res.status(201).send('Wrong Password');
            //     }


            // })
        }

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


// Adding a new Product
userRoutes.route('/vendor/add').post(function(req, res) {
    let product = new Product(req.body);
    console.log(req.body)
    product.save()
        .then(user => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting all the products
userRoutes.route('/vendor/product').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.find({username: `${product.username}`, status: `${product.status}` , quantity: {$ne: `${product.quantity}` } },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the products ready to dispatch
userRoutes.route('/vendor/dispatch').post(function(req, res) {
    let product=req.body
    console.log("prod")
    console.log(req.body)
    Product.find({username: `${product.username}`, status: `${product.status}` , quantity: `${product.quantity}` },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the products dispatched
userRoutes.route('/vendor/dispatched').post(function(req, res) {
    let product=req.body
    console.log("prod")
    console.log(req.body)
    Product.find({username: `${product.username}`, status: `${product.status}` , quantity: `${product.quantity}` },function(err, products) {
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
    // console.log("prod")
    // console.log(req.body)
    Product.updateOne({username: `${product.username}`, status: `${product.status}` , quantity: {$ne: `${product.quantity}` } , name: `${product.name}` }, { $set: {status: "Cancelled"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Cancelling product
userRoutes.route('/vendor/dispatch_disp').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.updateOne({username: `${product.username}`, status: `${product.status}` , quantity: `${product.quantity}` , name: `${product.name}` }, { $set: {status: "Dispatched"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//app is an instance of express and we use userRoutes
app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
