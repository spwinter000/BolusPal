import React, { useState } from 'react';
import { NavLink, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import boluspallogo from '../images/boluspal-logo.png';

const NavBar = ({loggedIn, handleLogout}) => {

    // if user is logged in, show a certain navbar, else show another with login and register
    const loggedInNav = (
        <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
                <Link className="navbar-brand" to="/"><img id="logo" src={require('../images/boluspal-logo.png').default}/></Link>
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
                        <NavLink className="nav-link" onClick={handleLogout} to="/login">Logout</NavLink>
                    </li>
                </div>
            </div>
        </nav>
    )

    const loggedOutNav =  (
        <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
                <Link className="navbar-brand" to="/"><img id="logo" src={require('../images/boluspal-logo.png').default}/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Log In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                    </li>
                </div>
            </div>
        </nav >
    )
    return <div>{loggedIn ? loggedInNav : loggedOutNav}</div>
// return(
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <Link className="navbar-brand" to="/">BolusPal</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//                 <div className="navbar-nav">
//                     {/* <ul className="navbar-nav"> */}
//                     {/* <ul className="navbar-nav"> */}
//                     <li className="nav-item">
//                             <NavLink className="nav-link" to="/boluses">My Boluses</NavLink>
//                     </li>
//                     <li className="nav-item">
//                             <NavLink className="nav-link" to="/profile">Profile</NavLink>
//                     </li>
//                     <li className="nav-item">
//                             <NavLink className="nav-link" to="/login">Login</NavLink>
//                     </li>
//                     <li className="nav-item">
//                             <NavLink className="nav-link" to="/register">Register</NavLink>
//                     </li>
//                     {/* </ul> */}
//                 </div>
//             </div>
//         </nav >
// )

}

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default NavBar;
