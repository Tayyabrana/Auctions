import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import userService from "../Services/userService";
import {
  isValidEmail,
  isValidPhoneNumber,
  validatePassword,
} from "../Utils/validationUtils";

const Register = () => {

    
  let navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const buttons = [
    { name: "Register as Customer", value: "buyer" },
    { name: "Register as Seller", value: "seller" },
  ];


  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    password: "",
    role: buttons[0].value,
  });
  console.log('user data' , user);
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });

  // Handle Inputs
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const validationErrors = validateForm(user);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await userService.registerUser(user);
        const { userData } = response;
        if (userData) {
          message.success("User created successfully");
          navigate("/login");
        }
      } catch (error) {
        message.error(error.response.data);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (userData) => {
    const errors = {};

    if (!userData.name) {
      errors.name = "Name is required";
    }

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(userData.email)) {
      errors.email = "Invalid email address";
    }

    if (!userData.contact) {
      errors.contact = "Contact is required";
    } else if (!isValidPhoneNumber(userData.contact)) {
      errors.contact = "Contact must be a 10-digit number";
    }

    if (!userData.age) {
      errors.age = "Age is required";
    }

    if (!userData.gender) {
      errors.gender = "Gender is required";
    }

    if (!userData.password) {
      errors.password = "Password is required";
    } else {
      const validationResults = validatePassword(userData.password);
      setPasswordValidation(validationResults);

      if (!validationResults.length) {
        errors.password = "Password must meet all criteria";
      }
    }

    return errors;
  };

  const renderValidationStatus = (isValid) => {
    return isValid ? (
      <i className="fa fa-check text-success"></i>
    ) : (
      <i className="fa fa-times text-danger"></i>
    );
  };
 

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center form text-white justify-content-center order-2">
            <h1 className="display-4 fw-bolder">Hello</h1>
            <p className="lead text-center">Enter Your Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <div className="d-flex justify-content-between">
              {buttons.map((value, index) => (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(index);
                    setUser({ ...user, role: value?.value });
                  }}
                  className={` border border-primary p-3 mb-3 rounded ${
                    selected === index
                      ? "bg-primary text-light"
                      : "text-primary"
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  value={user.email}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="number" // Change to type="text" or use a pattern validation for 10-digit numbers
                  className="form-control"
                  id="contact"
                  name="contact"
                  onChange={handleInput}
                  value={user.contact}
                />
                {errors.contact && (
                  <div className="text-danger">{errors.contact}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleInput}
                />
                {errors.age && <div className="text-danger">{errors.age}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleInput}
                />
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="password-input">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                  />
                  <div>
                    Length {renderValidationStatus(passwordValidation.length)}{" "}
                    <br />
                    Special Character{" "}
                    {renderValidationStatus(
                      passwordValidation.specialChar
                    )}{" "}
                    <br />
                    Uppercase{" "}
                    {renderValidationStatus(passwordValidation.uppercase)}{" "}
                    <br />
                    Lowercase{" "}
                    {renderValidationStatus(passwordValidation.lowercase)}{" "}
                    <br />
                    Digit {renderValidationStatus(passwordValidation.digit)}
                  </div>
                </div>
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary w-100 mt-4 rounded-pill"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
