import React, { useState } from "react";
import "./Register.css";
import { signUp } from "../Redux/AuthAction_creator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const mapDispatchToProps=dispatch=>{
  return{
    signUp:(name,email,phone,password,cpassword)=>dispatch(signUp(name,email,phone,password,cpassword))
  }
}
function Register(props) {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.signUp(user.firstName,user.email,user.phone,user.password,user.cpassword)

    console.log(user);
  };
  const goSignin = () => {
    Navigate("/signin");
  };

  return (
    <div>
      <div className="container">
        <div className="img">
          <img src="image/signup.png" alt="background" />
        </div>
        <div className="signup-content">
          <form onSubmit={handleSubmit}>
            <img src="image/signuplogo.png" alt="signup logo" />
            <h2 className="title">Welcome here</h2>
            <div className="input-div">
              <label>Name:</label>
              <input
                name="firstName"
                type="text"
                id="name"
                value={user.firstName}
                onChange={handelChange}
              />
            </div>
            <div className="input-div">
              <label>Email:</label>
              <input
                name="email"
                type="email"
                id="email"
                value={user.email}
                onChange={handelChange}
              />
            </div>
            <div className="input-div">
              <label>Phone Number:</label>
              <input
                name="phone"
                type="m"
                id="phone"
                value={user.phone}
                onChange={handelChange}
              />
            </div>

            <div className="input-div">
              <label>Password:</label>
              <input
                name="password"
                type="password"
                id="password"
                value={user.password}
                onChange={handelChange}
              />
            </div>
            <div className="input-div">
              <label>Confirm Password:</label>
              <input
                name="cpassword"
                type="password"
                id="cpassword"
                value={user.cpassword}
                onChange={handelChange}
              />
            </div>
            <button type="submit" className="signup_btn">
              sign up
            </button>

            <div className="signup_button">
              <p>
                have an account? <span onClick={goSignin}>Log in</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect(null,mapDispatchToProps)( Register);
