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
          ML annotation tool
        </Link>
      </div>
    );
  }
}
