import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({logged_in, handle_logout}) => {
    // if user is logged in, show a certain navbar, else show another with login and register
    const logged_in_nav = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">BolusPal</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                <li className="nav-item">
                        <NavLink className="nav-link" to="/boluses">My Boluses</NavLink>
                </li>
                <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                        <NavLink className="nav-link" onClick={handle_logout}>Logout</NavLink>
                </li>
                </div>
            </div>
        </nav >
    )

    const logged_out_nav =  (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">BolusPal</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
                </div>
            </div>
        </nav >
    )
    return <div>{logged_in ? logged_in_nav : logged_out_nav}</div>
}

        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //         <Link className="navbar-brand" to="/">BolusPal</Link>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNav">
        //         <div className="navbar-nav">
        //         {/* <ul className="navbar-nav"> */}
        //         {/* <ul className="navbar-nav"> */}
        //         <li className="nav-item">
        //                 <NavLink className="nav-link" to="/boluses">My Boluses</NavLink>
        //         </li>
        //         <li className="nav-item">
        //                 <NavLink className="nav-link" to="/profile">Profile</NavLink>
        //         </li>
        //         <li className="nav-item">
        //                 <NavLink className="nav-link" to="/login">Login</NavLink>
        //         </li>
        //         <li className="nav-item">
        //                 <NavLink className="nav-link" to="/register">Register</NavLink>
        //         </li>
        //         {/* </ul> */}
        //         </div>
        //     </div>
        // </nav >

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    // display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};

export default NavBar;
