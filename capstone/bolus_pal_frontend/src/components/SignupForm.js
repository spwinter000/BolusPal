import React, { Component } from 'react';
import CSRFToken from './csrfToken';
import { Redirect } from 'react-router';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmation: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    
    render() {
        return (
        <div className="outer-register">
            <div className="register">
                <h2>Sign Up</h2>
                <form onSubmit={e => this.props.handleSignup(e, this.state)} method="post">
                <CSRFToken />
                    <div className="form-group">
                        <input className="form-control" autoFocus type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                        {this.props.usernameError ? <small>{this.props.usernameError}</small> : null}
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password" value={this.state.confirmation} onChange={this.handleChange} required/>
                        {this.props.passwordError ? <small>{this.props.passwordError}</small> : null}
                    </div>
                    <input className="btn btn-primary" type="submit" value="Register"/>
                </form>
                {/* Already have an account? <a href="{% url 'login' %}">Log In here.</a> */}
            <div className="success">{this.props.success ? this.props.success : null}</div>
            </div>
        </div>
         );
        }
    }
 
export default SignupForm;