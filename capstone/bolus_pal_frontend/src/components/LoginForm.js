import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''        
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // go into state and find name from target element i.e. username and set that property's value to target element value i.e. scott 
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit(event){
        alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
    }

    render() { 
        return ( 
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} method="post">
                    <div className="form-group">
                        <input autoFocus className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Login"/>
                </form>
            </div>
         );
    }
}
 
export default LoginForm;