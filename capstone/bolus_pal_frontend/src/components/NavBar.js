import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';

const NavBar = () => {
    // if user is logged in, show a certain navbar, else show another with login and register
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">BolusPal</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                {/* <ul className="navbar-nav"> */}
                <li className="nav-item">
                        <NavLink className="nav-link" to="/boluses">My Boluses</NavLink>
                </li>
                <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
                {/* </ul> */}
                </div>dfdg
            </div>
        </nav >
    )
}

export default NavBar;