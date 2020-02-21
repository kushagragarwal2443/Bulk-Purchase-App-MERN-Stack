import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from 'react';

export default class DispatchedProduct extends Component {
    
    constructor(props) {
        super(props);
        //inheriting the variables of parent class
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
            status: 'Dispatched',
            quantity: 0,
            username: this.state.vendor         
        }
        axios.post('http://localhost:4000/vendor/dispatched', Product)
        //data received from backend
            .then(res => {
                //the products list is sent by product and stored in our class instance
                this.setState({product: res.data});
            })
            .catch((error) => {
                //catching errors
                console.log("Error: ", error)
            })
    }

    render() {
        return (
            <div>
                <table className="table-hover table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th><b>Name</b></th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.product.map((Productlist, i) => {
                        //filling the table with products
                            return (
                                //each row is one product
                                <tr>
                                    <td><b>{Productlist.name}</b></td>
                                    <td>Rs {Productlist.price}</td>
                                    <td></td>
                                  
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