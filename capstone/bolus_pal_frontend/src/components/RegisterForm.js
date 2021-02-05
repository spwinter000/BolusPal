import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
    }
    render() { 
        return ( 
        <div className="register">
            <h2>Register</h2>
            <form action="" enctype="multipart/form-data" method="post">
                <div className="form-group">
                    <input className="form-control" autofocus type="text" name="username" placeholder="Username" required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email Address" required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password" required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password" required/>
                </div>
                <input className="btn btn-primary" type="submit" value="Register"/>
            </form>

            {/* Already have an account? <a href="{% url 'login' %}">Log In here.</a> */}
        </div>
         );
    }
}
 
export default RegisterForm;