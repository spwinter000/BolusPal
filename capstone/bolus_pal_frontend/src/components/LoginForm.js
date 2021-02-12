import React, { Component } from 'react';
import axiosInstance from "../AxiosApi"
import CSRFToken from './csrfToken';
// import {handleLogin} from '../App';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',     
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleChange = this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // const { handleLogin } = this.props;

    // go into state and find name from target element i.e. username and set that property's value to target element value i.e. scott 
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit(event){
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();

        let logged_in = {...this.props.logged_in}


        // console.log(this.props.logged_in)
        // try {
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
            // data = response.data
            // console.log(response)
            result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                // return data;
            },
            logged_in = true
             ). catch (error => {
            throw error;
        })
    }

    render() { 
        return ( 
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} method="post">
                {/* <form onSubmit={e => this.props.handleLogin(e, this.state)} method="post"> */}
                <CSRFToken />
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