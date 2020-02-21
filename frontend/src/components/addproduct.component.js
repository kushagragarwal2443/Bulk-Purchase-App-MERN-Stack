import React, {Component} from 'react';
import axios from 'axios';

export default class AddProduct extends Component {
    
    constructor(props) {
        super(props);
        //inheriting the variables of parent class

        this.state = {
            name: '',
            //product name to be added
            quantity: '',
            //quantity of product
            username: this.props.match.params.id,
            //vendor name
            status: 'Not Dispatched',
            //so that goes to product list if quantity >0 and dispatch list if quantity =0
            price: ''
            
            
        }
        console.log("Point A")
        this.onChangePrice = this.onChangePrice.bind(this);
        console.log("Point B")
        this.onChangeName = this.onChangeName.bind(this);
        console.log("Point C")
        this.onSubmit = this.onSubmit.bind(this);
        console.log("Point D")
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        console.log("Point E")

        
    }
    
    onChangePrice(event) {
        //Binding productprice change
        this.setState({ price: event.target.value });
    }

    onSubmit(e) {
        //function adds the record to the database
        e.preventDefault();
        const Product = {
            name: this.state.name,
            //product name entered in the form
            quantity: this.state.quantity,
            //product quantity entered in the form
            username: this.state.username,
            //vendor name from super class
            status: "Not Dispatched",
            //product not yhet dispatched
            price: this.state.price           
        }
        //send the instance to backend to add to database
        axios.post('http://localhost:4000/vendor/add', Product)
             .then(res => console.log("Added"));

        this.setState({
            name: '',
            //product name to be added
            quantity: '',
            //quantity of product
            status: 'Not Dispatched',
            //so that goes to product list if quantity >0 and dispatch list if quantity =0
            price: ''
        });
    }

    onChangeName(event) {
        //Binding productname change
        this.setState({ name: event.target.value });
    }

    onChangeQuantity(event) {
        //Binding productquantity change
        this.setState({ quantity: event.target.value });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />  
                        </div>   
                        <div className="form-group">
                            <label>Quantity: </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                                />  
                        </div>               
                        <div className="form-group">
                            <label>Price: </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                />  
                        </div>                        
                        <div className="form-group">
                            <input className="btn btn-primary" type="submit" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}