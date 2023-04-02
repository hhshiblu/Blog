import React, { useState } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (State) => {
  return {
    islogin: State.islogin,
  };
};

function Navigation(props) {
  const [activemenu, setActiveMenu] = useState("nav_menu");
  const [toggleicon, setToggleIcon] = useState("toggle");

  const ToggleMenu = () => {
    if (activemenu === "nav_menu") {
      setActiveMenu("nav_menu nav_phone");
      setToggleIcon("toggle toggle1");
    } else {
      setActiveMenu("nav_menu");
      setToggleIcon("toggle");
    }
  };
  return (
    <div>
      <div className="container-fluid nav">
        <div className="logo">
          <NavLink to="/">
            <h1>
              Ha<span>S</span>an
            </h1>
          </NavLink>
        </div>
        <div>
          <ul className={activemenu}>
            <li>
              <NavLink onClick={ToggleMenu} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={ToggleMenu} to="/blog">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink onClick={ToggleMenu} to="/service">
                Service
              </NavLink>
            </li>
            <li>
              <NavLink onClick={ToggleMenu} to="/contact">
                Contact us
              </NavLink>
            </li>

            <div className="login">
              <li>
                {" "}
                {props.islogin ? (
                  <NavLink to="/logOut">logOut</NavLink>
                ) : (
                 
                    <NavLink onClick={ToggleMenu} to="/signin">
                      Login
                    </NavLink>
                 
                )}
              </li>
            </div>
          </ul>
        </div>
        <div onClick={ToggleMenu} className={toggleicon}>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Navigation);
