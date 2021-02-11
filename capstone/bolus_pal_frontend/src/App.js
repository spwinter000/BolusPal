import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from './components/NavBar';
import BolusList from './components/BolusList';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './index.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // displayed_form: '',
            // logged_in: localStorage.getItem('token') ? true : false,
            // username: '',
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
    }

    componentDidMount() {
        fetch("api/users")
            .then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                return { placeholder: "Something went wrong!" };
                });
            }
            return response.json();
            })
            .then(data => {
            this.setState(() => {
                return {
                data,
                loaded: true
                };
            });
            });
        }

    render() {
        return (
            <div>
            <NavBar />
            <div className="container">
                {this.state.data.map(function(person, i) {
                    return (
                        <p key={i} className="welcome">
                        Welcome back, {person.username}
                    </p>
                    );
                })}
            </div>
                <Switch>
                    <Route path="/boluses" component={BolusList}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/register" component={RegisterForm}></Route>
                </Switch>
            </div>
        );
    }

}

export default App;

// const container = document.getElementById("app");
// render(<App />, container);