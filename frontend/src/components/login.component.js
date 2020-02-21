import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const loginUser = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:4000/login', loginUser)
             .then(res => {
                 //entered the login page                             
                    if(res.data.type === "Customer")
                    {
                        console.log("The logged in user is Customer")
                        this.props.history.push({                            
                            //i redirect to a new page with the given address
                            pathname: 'customer/' + res.data.username
                        })
                    }
                    else if(res.data.type === "Vendor")
                    {
                        console.log("The logged in user is Vendor")
                        this.props.history.push({
                            //i redirect to a new page with the given address
                            pathname: 'vendor/' + res.data.username
                        })
                    }
                    else{
                        console.log("The user is neither a Vendor nor a Customer hence no login")
                    this.props.history.push(
                        {
                            //redirecting the user back to the login page for login reattempt
                            pathname: '/login'
                        })
                    }

            });

        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}