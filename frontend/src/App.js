import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        axios.get('/accounts/all')
            .then(res => {
                this.setState({ accounts: res.data });
                console.log(this.state.accounts);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ACCOUNTS LIST
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Account</Link></h4>
                        <table class="table table-stripe">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Date of birth</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.accounts.map(acc =>
                                <tr>
                                    <td><Link to={`/show/${acc.id}`}>{acc.firstName}</Link></td>
                                    <td>{acc.lastName}</td>
                                    <td>{acc.email}</td>
                                    <td>{acc.dateOfBirth}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;