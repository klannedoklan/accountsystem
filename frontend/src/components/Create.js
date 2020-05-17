import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, dateOfBirth } = this.state;

        axios.post('/accounts/create', { firstName, lastName, email, dateOfBirth})
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        const { firstName, lastName, email, dateOfBirth} = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD Account
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Accounts List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="isbn">First Name:</label>
                                <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <label for="title">Last Name:</label>
                                <input type="text" class="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" />
                            </div>
                            <div class="form-group">
                                <label for="publisher">Email:</label>
                                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="published_date">Date of birth:</label>
                                <input type="text" className="form-control" name="dateOfBirth" value={dateOfBirth}
                                       onChange={this.onChange} placeholder="Date of birth"/>
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;