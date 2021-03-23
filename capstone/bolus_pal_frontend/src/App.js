import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Switch, Redirect} from "react-router-dom";
import NavBar from './components/NavBar';
import BolusList from './components/BolusList';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import axiosInstance from "./AxiosApi";
import './index.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('access_token') ? true : false,
            loggedInUsername: '',
            loggedInID: '',
            usernameError: '',
            passwordError: '',
            success: ''
        }
        // this._isMounted = false;
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    // grab current user again if app component is refreshed
    componentDidMount(){
        if (this.state.loggedIn){
            axiosInstance.get('bolus_pal/current_user/')
            .then(result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                this.setState({ 
                    loggedInUsername: result.data.username, 
                    loggedInID: result.data.id
                })
                // console.log(result)
            },
            ).catch(error => {
                throw error;
            })
        }
    }
    
    // once user logs in, grab username to display in welcome message
    getCurrentUser() {
        if (this.state.loggedIn){
            fetch('http://127.0.0.1:8000/bolus_pal/current_user/', {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token')
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ 
                    loggedInUsername: json.username,
                    loggedInID: json.id
                });
                // console.log(json)
            });
            }
        }
    
    handleSignup(event, data){
        event.preventDefault();
        this.setState({usernameError: '', passwordError: '', success: ''});
        if (data.password !== data.confirmation){
            this.setState({
                passwordError: 'Passwords must match.'
            });
        } else {
        axiosInstance.post('bolus_pal/user/create/', {
            username: data.username,
            email: data.email,
            password: data.password
        }).then(result => { 
            if (result){
                this.setState({ success: 'Successful signup! Please proceed to login page.' })
                // console.log(result);
        }
        }).catch(error => {
            this.setState({
                usernameError: `The username '${data.username}' is already taken.`
            });
            throw error;
        })
    }
    }

    handleLogin(event, data){
        event.preventDefault();
        axiosInstance.post('bolus_pal/token/obtain/', {
            username: data.username,
            password: data.password
        }).then(result => {
            axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
            localStorage.setItem('access_token', result.data.access);
            localStorage.setItem('refresh_token', result.data.refresh);
            // console.log(result)
            this.setState({loggedIn: true}, function(){console.log(this.state.loggedIn)}), // set loggedIn to true to show logged in nav, username
            this.getCurrentUser()
        },
        ).catch(error => {
            throw error;
        })
    }
    
    handleLogout(){
        localStorage.removeItem('access_token');
        this.setState({ loggedIn: false, success: ''}, function(){console.log(this.state.loggedIn)});
    };

    render() {
        // console.log(this.state.loggedIn)
        return (
            <div>
                <NavBar 
                    loggedIn={this.state.loggedIn}
                    handleLogout={this.handleLogout}
                />
            <div className="container">
                {this.state.loggedIn ? <p className="welcome">Hi, <b>{this.state.loggedInUsername}</b>!</p> : <p className="welcome"></p>}
            </div>
                <Switch>
                    <Route path="/register"
                        component={() => 
                            <SignupForm 
                                loggedIn={this.state.loggedIn}
                                usernameError={this.state.usernameError}
                                passwordError={this.state.passwordError}
                                success={this.state.success}
                                handleSignup={this.handleSignup}
                            />}
                        />
                    <Route path="/boluses" 
                        component={() => 
                            <BolusList
                                loggedInUsername={this.state.loggedInUsername}
                                loggedInID={this.state.loggedInID}
                            />}
                        />
                    <Route path="/login" 
                        component={() => 
                            <LoginForm 
                                loggedIn={this.state.loggedIn}
                                handleLogin={this.handleLogin}
                            />}
                        />
                    <Route path="/profile" 
                        component={() => 
                            <Profile 
                                loggedIn={this.state.loggedIn}
                                loggedInID={this.state.loggedInID}
                            />}
                    />
                </Switch>
            </div>
        );
    }

}

export default App;