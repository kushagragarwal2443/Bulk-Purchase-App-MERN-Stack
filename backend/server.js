const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();


let User = require('./models/user');//database added 

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
//Connection created with MongoDB
connection.once('open', function() {
    console.log("MongoDB connected");
})

//Users List Rendered
userRoutes.route('/').get((req, res) => {
    console.log("Printing Users List")
    User.find(
        (err, userslist) => {
        if(err)
        {
            res.status(400).send({"message": "Error"});
            console.log("Error in users list")
        }
        else
        {
            console.log("Users list successfully returned")
            res.json(userslist);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post((req, res) => {
    let user = new User(req.body);
    console.log(user)
    user.save()
    //user saved in the database
        .then(user => {
            console.log("User added successfully")
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            console.log("User addition has Error")
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


//Render the Products list
userRoutes.route('/vendor/product').post((req, res) => {
    console.log("I am printing products list")
    Product.find({
        username: req.body.username, 
        quantity: {$ne: 0 }, 
        status: req.body.status},
        (err, productslist) => {
        console.log(productslist)
        if (err) {
            console.log("Error in product list")
            res.status(400).send({"message": "Error"});
        }
        else {
            console.log("Products list successfully returned")
            res.json(productslist);
        }
    });
});

// New Product Addition
userRoutes.route('/vendor/add').post((req, res) => {
    let newproduct = new Product(req.body);
    newproduct.save()
    console.log("Saved Product")
        .catch(err => {
            console.log("Error")
            res.status(400).send({"message": "Error"});
        })
        console.log("I am in product addition")
        .then(user => {
            console.log("Added product")
            res.status(200).send({"message": "Added"});
        });
});



// Getting all the products ready to dispatch
userRoutes.route('/vendor/dispatch').post((req, res) => {
    console.log("I am printing dispatching products list")
    Product.find({
        username: req.body.username,
        quantity: {$eq: 0},
        status: req.body.status},        
        (err, dispatchproducts) => {
        if(err)
        {
            console.log("Error in dispatch product list")
            res.status(400).send({"message": "Error"});
        }
        else
        {
            console.log("Dispatch Products list successfully returned")
            res.json(dispatchproducts);
        }
    });
});

// Getting all the products dispatched
userRoutes.route('/vendor/dispatched').post((req, res) => {
    console.log("I am printing dispatched products list")
    Product.find({
        username: req.body.username,
        quantity: {$eq: 0},
        status: req.body.status}, 
        (err, dispatchedproducts) => {
        if(err)
        {
            res.status(400).send({"message": "Error"});
            console.log("Error in dispatched product list")
        }
        else
        {
            console.log("Dispatched Products list successfully returned")
            res.json(dispatchedproducts);
        }
    });
});

//Product being dispatched
userRoutes.route('/vendor/dispatch_disp').post((req, res) => {
    console.log("Dispatching")
    Product.updateOne({
        //finding the product
        username: req.body.username,
        name: req.body.name,
        quantity: {$eq: 0},
        //as in the dispatch list all products will have 0 quantity left
        status: req.body.status },
        {$set: {status: "Dispatched"} },
        //this moves the product from dispatch to dispatched list
        (err, dispatchingproducts) => {
        if(err)
        {
            res.status(400).send({"message": "Error"});
            console.log("Error in dispatching")
        }
        else
        {
            console.log("Dispatching successful")
            res.json(dispatchingproducts);
        }
    });
});

//Cancel Product
userRoutes.route('/vendor/product_cancel').post((req, res) => {
    console.log("Cancelling")
    Product.updateOne({
        //searching for the product
        username: req.body.username,
        name: req.body.name,
        quantity: {$ne: 0},
        //as the products in the available product list will have non zero quantities
        status: req.body.status },
        {$set: {status: "Cancelled"} },
        (err, cancellingproducts) => {
        if(err)
        {
            res.status(400).send({"message": "Error"});
            console.log("Error in cancelling")
        }
        else
        {
            console.log("Cancelling successful")
            res.json(cancellingproducts);
        }
    });
});



//app is an instance of express and we use userRoutes
app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
