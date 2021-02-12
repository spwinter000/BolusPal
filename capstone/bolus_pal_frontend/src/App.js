import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";
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
            displayed_form: '',
            logged_in: localStorage.getItem('access_token') ? true : false,
            // logged_in: true,
            username: '',
            // data: [],
            // loaded: false,
            // placeholder: "Loading"
        }
        // this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        // this.getCookie = this.getCookie.bind(this);
    }

    componentDidMount() {
        if (this.state.logged_in){
            fetch('http://127.0.0.1:8000/bolus_pal/current_user/', {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token')

            }
            })
            .then(res => res.json())
            .then(json => {
              this.setState({ 
                //   logged_in: true,
                  username: json.username 
                });
                console.log(json);
            });
        }
        }

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
        //         logged_in: true,
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
        //             logged_in: true
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
        //             logged_in: true,
        //             displayed_form: '',
        //             username: json.username
        //         });
        //     });
        // }

        
        handleLogout(){
            localStorage.removeItem('access_token');
            this.setState({ logged_in: false, username: '' });
            console.log('logged out')
        };
        // fetch("api/users")
        //     .then(response => {
        //     if (response.status > 400) {
        //         return this.setState(() => {
        //         return { placeholder: "Something went wrong!" };
        //         });
        //     }
        //     return response.json();
        //     })
        //     .then(data => {
        //     this.setState(() => {
        //         return {
        //         data,
        //         loaded: true
        //         };
        //     });
        //     });
        // }

    render() {
        return (
            <div>
            <NavBar 
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handleLogout={this.handleLogout}
            />
            <div className="container">
                {this.state.logged_in ? <p className="welcome">Welcome, {this.state.username}</p> : <p className="welcome"></p>}
                {/* <p className="welcome"></p> */}
                {/* {this.state.data.map(function(person, i) {
                    return (
                        <p key={i} className="welcome">
                        Welcome back, {person.username}
                    </p>
                    );
                })} */}
            </div>
                <Switch>
                    {/* <Route path="/login" render={(props) => <LoginForm handle_login={this.handle_login} />}/> */}
                    <Route path="/login" component={() => <LoginForm handleLogin={this.handleLogin} logged_in={this.state.logged_in}/>}/>
                    <Route path="/register" component={RegisterForm}></Route>
                    <Route path="/boluses" component={BolusList}></Route>
                    <Route path="/profile" component={Profile}></Route>
                </Switch>
            </div>
        );
    }

}

export default App;

// const container = document.getElementById("app");
// render(<App />, container);