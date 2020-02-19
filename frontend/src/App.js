import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/login.component'
import Vendor from './components/vendor.component'
import Customer from './components/customer.component'
import Vendor_add from './components/add_vendor.component'
import Vendor_product from './components/product_vendor.component'
import Vendor_dispatch from './components/dispatch_vendor.component'
import Vendor_dispatched from './components/dispatched_vendor.component'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <Route path="/login" component={Login}/>
        <Route path="/vendor/:id" component={Vendor}/>
        <Route path="/customer/:id" component={Customer}/>
        <Route path="/vendor/add/:id" component={Vendor_add}/>
        <Route path="/vendor/product/:id" component={Vendor_product}/>
        <Route path="/vendor/dispatch/:id" component={Vendor_dispatch}/>
        <Route path="/vendor/dispatched/:id" component={Vendor_dispatched}/>
      </div>
    </Router>
  );
}

export default App;
