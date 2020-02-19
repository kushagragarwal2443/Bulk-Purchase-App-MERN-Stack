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
                 if(Object.entries(res.data).length === 1)
                 {
                     if(res.data[0].type === "Customer")
                     {
                         this.props.history.push
                         (
                             {
                                 pathname: 'customer/' + res.data[0].username
                             }
                         )
                     }
                     else if(res.data[0].type === "Vendor")
                     {
                         this.props.history.push(
                             {
                                 pathname: 'vendor/' + res.data[0].username
                             }
                         )
                     }
                     else{

                        this.props.history.push(
                            {
                                pathname: '/login'
                            }
                        )
                     }
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}