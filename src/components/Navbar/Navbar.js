import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { isLoggedInAdmin, isLoggedInRegular, deleteTokens } from "../Auth.js";
import UserOptions from ".././UserOptions/UserOptions.js";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminUser: true,
      regularUser: isLoggedInRegular(),
    };
  }
  render() {
    const { adminUser, regularUser } = this.state;
    return (
      <div className="header">
        <Link to="/" className="appname">
          Forms AI
        </Link>
        <div className="centerNavLinks">
          {!adminUser && !regularUser && (
            <div>
              <NavLink
                to="/home"
                className="navbar"
                activeClassName="active-links"
              >
                Home
              </NavLink>
              <Link to="/login" className="login">
                Login
              </Link>
            </div>
          )}
          {adminUser && !regularUser && (
            <div>
              <NavLink
                to="/home"
                className="navbar"
                activeClassName="active-links"
              >
                Home
              </NavLink>
              <NavLink
                to="/logs"
                className="navbar"
                activeClassName="active-links"
              >
                Analyze Logs
              </NavLink>
              <NavLink
                to="/detectform"
                className="navbar"
                activeClassName="active-links"
              >
                Detect Form
              </NavLink>
              <NavLink
                to="/create"
                className="navbar"
                activeClassName="active-links"
              >
                Create Form
              </NavLink>
              <NavLink
                to="/manage"
                className="navbar"
                activeClassName="active-links"
              >
                Manage Forms
              </NavLink>
              <NavLink
                to="/addusers"
                className="navbar"
                activeClassName="active-links"
              >
                Add Users
              </NavLink>
              <UserOptions />
            </div>
          )}
          {!adminUser && regularUser && (
            <div>
              <NavLink
                to="/home"
                className="navbar"
                activeClassName="active-links"
              >
                Home
              </NavLink>
              <NavLink
                to="/logs"
                className="navbar"
                activeClassName="active-links"
              >
                Analyze Logs
              </NavLink>
              <NavLink
                to="/detectform"
                className="navbar"
                activeClassName="active-links"
              >
                Detect Form
              </NavLink>
              <NavLink
                to="/create"
                className="navbar"
                activeClassName="active-links"
              >
                Create Form
              </NavLink>
              <UserOptions />
            </div>
          )}
        </div>
      </div>
    );
  }
}
