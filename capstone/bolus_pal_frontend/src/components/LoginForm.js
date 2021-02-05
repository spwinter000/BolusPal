import React, { Component } from 'react';

class LoginForm extends Component {
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
            <div className="login">
                <h2>Login</h2>
                <form action="" method="post">
                    <div className="form-group">
                        <input autoFocus className="form-control" type="text" name="username" placeholder="Username" required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password" required/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Login"/>
                </form>
            </div>
         );
    }
}
 
export default LoginForm;