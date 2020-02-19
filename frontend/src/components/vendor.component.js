import React, {Component} from 'react';
import axios from 'axios';

export default class Vendor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vendor: this.props.match.params.id
            
        }

    }

    add(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/add/" + this.state.vendor
                        })
    }

    product(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/product/" + this.state.vendor
                        })
    }

    dispatch(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatch/" + this.state.vendor
                        })
    }
    
    dispatched(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatched/" + this.state.vendor
                        })
    }
    render(){
        return (
            <div>
            <Button block disabled variant="secondary">Hello, Vendor {this.state.vendor} </Button>
            <Button variant="success" onClick={(e)=>this.add(e,info)}> Add Product </Button>
            <Button variant="dark" onClick={(e)=>this.product(e,info)}> Current Products </Button>
            <Button variant="success" onClick={(e)=>this.dispatch(e,info)}> Dispatch </Button>
            <Button variant="dark" onClick={(e)=>this.dispatched(e,info)}> Dispatched </Button>
            </div>
        )
    }

}