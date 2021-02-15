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
            // pathname: '',
            // nextPathname: ''

        }
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        // this.requireAuth = this.requireAuth.bind(this);
    }

    // componentDidMount() {
    //     if (this.state.loggedIn){
    //         fetch('http://127.0.0.1:8000/bolus_pal/current_user/', {
    //         headers: {
    //             'Authorization': "JWT " + localStorage.getItem('access_token')

    //         }
    //         })
    //         .then(res => res.json())
    //         .then(json => {
    //           this.setState({ 
    //             //   loggedIn: true,
    //               username: json.username 
    //             });
    //             console.log(json);
    //         });
    //     }
    //     }

        // get cookie for CSRF
        // getCookie(name) {
        //     let cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         const cookies = document.cookie.split(';');
        //         for (let i = 0; i < cookies.length; i++) {
        //             const cookie = cookies[i].trim();
        //             // Does this cookie string begin with the name we want?
        //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        //   }

        // handleLogin(event, data){
        //     event.preventDefault();
        //     fetch('http://127.0.0.1:8000/bolus_pal/token/obtain/', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'X-CSRFToken': getCookie('csrftoken')
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then(res => res.json())
        //     .then(json => {
        //       localStorage.setItem('token', json.token);
        //       this.setState({
        //         loggedIn: true,
        //         displayed_form: '',
        //         username: json.user.username
        //       });
        //     });
        // }

        // handleLogin(event){
        //     event.preventDefault();
        //     axiosInstance.post('/token/obtain/', {
        //             username: this.state.username,
        //             password: this.state.password
        //         }).then(
        //         result => {
        //             axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
        //             localStorage.setItem('access_token', result.data.access);
        //             localStorage.setItem('refresh_token', result.data.refresh);
        //         }
        //          ). catch (error => {
        //         throw error;
        //     })
        //     .then(
        //         this.setState({
        //             loggedIn: true
        //             // displayed_form: ''
        //             // username: json.username
        //         })
        //     )
        // }


        // handleLogin(event, data){
        //     event.preventDefault();
        //     fetch('http://127.0.0.1:8000/bolus_pal/token/obtain/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //             // 'X-CSRFToken': getCookie('csrftoken')
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then(res => res.json())
        //     .then(json => {
        //         localStorage.setItem('access_token', json.access_token);
        //         this.setState({
        //             loggedIn: true,
        //             displayed_form: '',
        //             username: json.username
        //         });
        //     });
        // }
        
        // handleLoginNav(event){
        //     event.preventDefault();
        //     this.setState({ loggedIn: true });
        //     console.log('loggedIn')
        // };
        
        
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


        // requireAuth(nextState, replace) {
        //     if (this.state.loggedIn) {
        //       replace({
        //         pathname: '/login',
        //         state: { nextPathname: nextState.location.pathname }
        //       })
        //     }
        //   }
        
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
            // const history = useHistory();
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
                // history.push('boluses');
                // browserHistory.push('/boluses');
                // console.log(this.state.username)
                // return <Redirect to="/boluses" />
            },
            console.log(localStorage)
            
            // ).then(
                    // console.log(this.state.loggedIn)
                ).catch(error => {
                    throw error;
                })
                // .then(
                //     window.location.reload()
                // )
        }
        
        handleLogout(){
            localStorage.removeItem('access_token');
            this.setState({ loggedIn: false, loginUsername: '', loginPassword: '' }, function(){console.log(this.state.loggedIn)});
        };

    render() {
        return (
            <div>
                <NavBar 
                    loggedIn={this.state.loggedIn}
                    display_form={this.display_form}
                    handleLogout={this.handleLogout}
                    // handleLoginNav={this.handleLoginNav}
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
                        // render={() => (this.state.loggedIn ? (<Redirect to="/boluses"/>) : (<LoginForm/>))}
                    />
                    <Route path="/profile" component={Profile}></Route>
                </Switch>
            </div>
        );
    }

}

export default App;

// const container = document.getElementById("app");
// render(<App />, container);