import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { message } from "antd";
import userService from "../Services/userService";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // Handle Input
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    // Handle Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = user;
        if (!email || !password) {
            message.error('Please enter the valid data!');
            return;
        }
        try {
            const response = await userService.loginUser(user);
            const { token } = response;
            if (token) {
                Cookies.set('auction-jwt-token', token);
                setIsAuthenticated(true);
                const user = await userService.getRole();
                console.log(user)
                localStorage.setItem('role', user.role)
                message.success("Login Successful");
                navigate("/");
            }
        } catch (error) {
            message.error(error.response.data);
        }
    };
    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink
                            to="/register"
                            className="btn btn-outline-light rounded-pill pb-2 w-50"
                        >
                            Register
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-4 rounded-pill"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
