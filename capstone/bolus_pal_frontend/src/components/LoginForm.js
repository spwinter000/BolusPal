import React, { Component } from 'react';
import CSRFToken from './csrfToken';
import { Redirect } from 'react-router';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''     
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // go into state and find name from target element i.e. username and set that property's value to target element value i.e. scott 
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    // send user to their boluses page after they log in, else render login form
    render() {
        if (this.props.loggedIn === true) { 
            return (<Redirect to="/boluses" />);
         } else { 
            return ( 
                <div className="login">
                    <h2>Log In</h2>
                    <form onSubmit={e => this.props.handleLogin(e, this.state)} method="post">
                    <CSRFToken />
                        <div className="form-group">
                            <input autoFocus className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                        </div>
                        <input className="btn btn-primary" type="submit" value="Login"/>
                    </form>
                </div>
            );
        }
    }
}
 
export default LoginForm;