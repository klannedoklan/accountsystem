import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {}
        };
    }

    componentDidMount() {
        axios.get('/accounts/'+this.props.match.params.id)
            .then(res => {
                this.setState({ account: res.data });
                console.log(this.state.account);
            });
    }

    onChange = (e) => {
        const state = this.state.account
        state[e.target.name] = e.target.value;
        this.setState({account:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {  firstName, lastName, email, dateOfBirth } = this.state.account;

        axios.put('/accounts/'+this.props.match.params.id, {  firstName, lastName, email, dateOfBirth })
            .then((result) => {
                this.props.history.push("/show/"+this.props.match.params.id)
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Contact
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.account.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Contact List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">First Name:</label>
                                <input type="text" class="form-control" name="firstName" value={this.state.account.firstName} onChange={this.onChange} placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <label for="title">Last Name:</label>
                                <input type="text" class="form-control" name="lastName" value={this.state.account.lastName} onChange={this.onChange} placeholder="Last Name" />
                            </div>
                            <div class="form-group">
                                <label for="description">Email:</label>
                                <input type="email" class="form-control" name="email" value={this.state.account.email} onChange={this.onChange} placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Date of birth:</label>
                                <input type="text" className="form-control" name="dateOfBirth"
                                       value={this.state.account.dateOfBirth} onChange={this.onChange}
                                       placeholder="Date of birth"/>
                            </div>
                            <button type="submit" class="btn btn-default">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;