import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((Userindex, index) => {
                            return (
                                <tr>
                                    <td>{Userindex.username}</td>
                                    <td>{Userindex.email}</td>
                                    <td>{Userindex.password}</td>
                                    <td>{Userindex.type}</td>
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