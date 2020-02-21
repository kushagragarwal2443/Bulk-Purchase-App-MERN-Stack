import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
export default class Vendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendor: this.props.match.params.id            
        }
    }

    productlist(e){
        this.props.history.push
                        ({
                            pathname: "/vendor/product/" + this.state.vendor
                        })
    }
    addproduct(e){
        this.props.history.push
                        ({
                            pathname: "/vendor/add/" + this.state.vendor
                        })
    }   
    dispatchableproduct(e){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatch/" + this.state.vendor
                        })
    }    
    dispatchedproduct(e){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatched/" + this.state.vendor
                        })
    }
    render(){
        return (
            <div>
            <p class="p-2 text-light bg-dark">Logged in as Vendor <b class="text-danger">{this.state.vendor}</b></p>
            <div class="ml-auto">
            <button type="button" class="ml-10.0 p-3.5 mr-4 mb-4 mt-2 btn btn-success" onClick={(e)=>this.productlist(e)}>Products List</button>
            <button type="button" class="p-3.5 mr-4 mb-4 mt-2 btn btn-info" onClick={(e)=>this.addproduct(e)}>Add Product</button>
            <button type="button" class="p-3.5 mr-4 mb-4 mt-2 btn btn-warning" onClick={(e)=>this.dispatchableproduct(e)}>Dispatchable Products</button>
            <button type="button" class="p-3.5 mr-4 mb-4 mt-2 btn btn-danger" onClick={(e)=>this.dispatchedproduct(e)}>Dispatched Products</button>
            </div>
            </div>
        )
    }

}