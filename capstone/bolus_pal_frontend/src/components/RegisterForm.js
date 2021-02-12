import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmation: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit(event){
        event.preventDefault();
        if (this.state.password !== this.state.confirmation){
            // return (
            //     <div id="winner">Passwords must match.</div>
            // )
            // // return false;
            alert('passwords must match')
        } else {
            alert('A user has attempted to register: ' + this.state.username + " " + this.state.email + " " + this.state.password + " " + this.state.confirmation);
        }
    }
    

    render() {
        return ( 
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={this.handleSubmit} method="post">
                <div className="form-group">
                    <input className="form-control" autoFocus type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password" value={this.state.confirmation} onChange={this.handleChange} required/>
                </div>
                <input className="btn btn-primary" type="submit" value="Register"/>
            </form>
            {/* Already have an account? <a href="{% url 'login' %}">Log In here.</a> */}
        </div>
         );
    }
}
 
export default RegisterForm;