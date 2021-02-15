import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Route, Switch, Redirect} from "react-router-dom";
import NavBar from './components/NavBar';
import BolusList from './components/BolusList';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import axiosInstance from "./AxiosApi";
import './index.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('access_token') ? true : false,
            loggedInUsername: '',
        }
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

        // grab current user again if app component is reloaded
        componentDidMount(){
            if (this.state.loggedIn){
                fetch('http://127.0.0.1:8000/bolus_pal/current_user/', {
                headers: {
                    'Authorization': "JWT " + localStorage.getItem('access_token')
                }
                })
                .then(res => res.json())
                .then(json => {
                  this.setState({ 
                    loggedInUsername: json.username
                    });
                });
            }
        }
        
        //once user logs in, grab username to display in welcome message
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
                    loggedInUsername: json.username
                    });
                });
                }
            }
        
        handleLogin(event, data){
            event.preventDefault();
            axiosInstance.post('/token/obtain/', {
                username: data.username,
                password: data.password
            }).then(result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                this.setState({ loggedIn: true}, function(){console.log(this.state.loggedIn)}), // set loggedIn to true to show logged in nav, username
                this.getCurrentUser()
            },
            console.log(localStorage)
            ).catch(error => {
                throw error;
            })
        }
        
        handleLogout(){
            localStorage.removeItem('access_token');
            this.setState({ loggedIn: false }, function(){console.log(this.state.loggedIn)});
        };

    render() {
        return (
            <div>
                <NavBar 
                    loggedIn={this.state.loggedIn}
                    handleLogout={this.handleLogout}
                />
            <div className="container">
                {this.state.loggedIn ? <p className="welcome">Welcome, {this.state.loggedInUsername}</p> : <p className="welcome"></p>}
            </div>
                <Switch>
                    <Route path="/register" component={RegisterForm}></Route>
                    <Route path="/boluses" component={BolusList}></Route>
                    <Route path="/login" 
                        component={() => 
                            <LoginForm 
                                loggedIn = {this.state.loggedIn}
                                handleLogin={this.handleLogin}
                            />}
                    />
                    <Route path="/profile" component={Profile}></Route>
                </Switch>
            </div>
        );
    }

}

export default App;