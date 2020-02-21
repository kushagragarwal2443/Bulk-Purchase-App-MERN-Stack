import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

//Importing all the Components
import UsersList from './components/userslist.component'
import CreateUser from './components/createuser.component'
import Vendor from './components/vendor.component'
import Login from './components/login.component'
import AddProduct from './components/addproduct.component'
import Customer from './components/customer.component'
import DispatchableProduct from './components/dispatchableproduct.component'
import ProductsList from './components/productslist.component'
import DispatchedProduct from './components/dispatchedproduct.component'


function App() {

  //first we create the basic template on top of which other pages would modify
  //then we define the path of various paths and render them appropriately using their component.js
  
  
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" component={CreateUser}/>
        <Route path="/vendor/:id" component={Vendor}/>
        <Route path="/vendor/dispatched/:id" component={DispatchedProduct}/>
        <Route path="/login" component={Login}/>
        <Route path="/vendor/add/:id" component={AddProduct}/>
        <Route path="/customer/:id" component={Customer}/>
        <Route path="/vendor/dispatch/:id" component={DispatchableProduct}/>
        <Route path="/vendor/product/:id" component={ProductsList}/>
        
        
      </div>      
    </Router>
  );
}

export default App;
