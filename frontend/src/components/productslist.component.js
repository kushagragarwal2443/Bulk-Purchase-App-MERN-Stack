import axios from 'axios';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ProductsList extends Component {
    
    constructor(props) {
        super(props);
        //inheriting parent class variables in the child class
        this.state = {
            //defining class object instance values            
            vendor: this.props.match.params.id,
            //vendor details are sent while the page is being rendered
            product: []
        }
    }

    componentDidMount() {
        
        //Setting initial values for the Product
        const Product={
            status: 'Not Dispatched',
            quantity: 0,
            username: this.state.vendor         
        }

        axios.post('http://localhost:4000/vendor/product', Product)
        //data received from backend
             .then(res => {
                 //the products list is sent by /product and stored in our class instance
                 this.setState({product: res.data});
             })
             .catch((error) => {
                 //catching errors
                 console.log("Error: ", error)
             })
    }
    removeproduct(e,Prodname,Usernam)
    {
        const Product={
            name: Prodname,
            quantity: 0,
            status: 'Not Dispatched',
            username: Usernam        
        }
        //Product's initial value set
        axios.post('http://localhost:4000/vendor/product_cancel ', Product)
        //to cancel the product
             .then(res => {
                const Product={
                    status: 'Not Dispatched',
                    username: this.state.vendor,
                    quantity: 0                    
                }
                axios.post('http://localhost:4000/vendor/product', Product)
                     .then(res => {
                         this.setState({product: res.data});
                         //The cancellation was successful
                     })
                     .catch((err) => {
                         //Error in cancellatian, hence catch flagged error
                         console.log("Error is: ",err);
                     })
                //re render the page but this time, the cancelled products wont be present     
                this.props.history.push
                ({
                    //re rendering
                    pathname: "/vendor/product/" + this.state.vendor
                })
              })
             .catch((err) => {
                 //Catching the flagged error
                 console.log("Error: ",err);
             })

        
    }
    render() {
        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>Cancel</th>
                            <th><b>Name</b></th>
                            <th>Quantity</th>
                            <th>Price</th>                           
                        </tr>
                    </thead>
                    <tbody>{this.state.product.map((Productlist, i) => {
                        //filling the table with products
                            return (
                                //each row is one product
                                <tr>
                                    <td><button class="p-3.5 btn btn-danger" onClick={(e)=>this.removeproduct(e,Productlist.name, this.state.vendor)}type="button" >Remove</button></td>
                                    <td><b>{Productlist.name}</b></td>
                                    <td>{Productlist.quantity} units</td>
                                    <td>Rs {Productlist.price}</td>
                                    
                                    
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}