import React, {Component} from 'react';
import axios from 'axios';
import Vendor from './vendor.component';

export default class AddVendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            Vendor: this.props.match.params.id
        }
    }

    componentDidMount() {
        
        const Product={
            username: this.state.Vendor,
            quantity: 0,
            status: 'Dispatched'
        }
        console.log(Product)
        axios.post('http://localhost:4000/vendor/dispatched', Product)
             .then(response => {
                 this.setState({product: response.data});
                 console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                {/* <p>HELLO VENDOR {this.state.Vendor} </p> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.product.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
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