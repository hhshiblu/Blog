import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { signinData } from "../Redux/AuthAction_creator";
import { connect } from "react-redux";
const mapDispatchToPops = (dispatch) => {
  return {
    signinData: (email, password) => dispatch(signinData(email, password)),
  };
};
function Login(props) {
  const navigate = useNavigate();
  const [user, setuser] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signinData(user.email, user.password);
    navigate("/signup");

  };

  const goSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="container">
      <div className="img">
        <img src="image/bg.png" alt="background" />
      </div>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <img src="image/login.png" alt="login" />

          <h2 className="title">Hello Again!</h2>
          <div className="input-div one">
            <label htmlFor="email">email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(event) =>
                setuser({ ...user, email: event.target.value })
              }
            />
          </div>
          <div className="input-div pass">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(event) =>
                setuser({ ...user, password: event.target.value })
              }
            />
          </div>
          <div className="forgot_pass">
            <span> Forgot Password?</span>
          </div>
          <button type="submit" className="btn">
            Login
          </button>

          <div className="signup_button">
            <p>
              Don't have an account? <span onClick={goSignup}> Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToPops)(Login);
