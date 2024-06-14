import React from 'react';
import Cookies from 'js-cookie';
import '../Styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = ({ setIsAuthenticated }) => {
    const handleLogout = () => {
        Cookies.remove('auction-jwt-token');
        setIsAuthenticated(false);
    };

    return (
        <div className="Navbar">
            <div className="NavRow bg-body-tertiary navabar-light shadow">
                <div className="NavLinks">
                    <NavLink
                        className="navbar-brand fw-bolder fs-4 mx-auto"
                        to="/home"
                    >
                        <img src={logo} width="50" height="50" alt="Auction logo" />
                    </NavLink>
                    <NavLink className={(navData) => navData.isActive ? 'active-link' : 'non-active-link'} to="/home">
                        Home
                    </NavLink>

                    <NavLink className={(navData) => navData.isActive ? 'active-link' : 'non-active-link'} to="/services">
                        Services
                    </NavLink>

                    <NavLink className={(navData) => navData.isActive ? 'active-link' : 'non-active-link'} to="/products">
                        Products
                    </NavLink>

                    <NavLink className={(navData) => navData.isActive ? 'active-link' : 'non-active-link'} to="/about">
                        About Us
                    </NavLink>

                    <NavLink className={(navData) => navData.isActive ? 'active-link' : 'non-active-link'} to="/contact">
                        Contact Us
                    </NavLink>

                </div>

                <div className="btn-div">
                    <button className="logout-btn btn btn-outline-primary ms-auto px-4 rounded-pill" onClick={handleLogout}>
                        <i className="fa fa-sign-in me-2"></i>Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
