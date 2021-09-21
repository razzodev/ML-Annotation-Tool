import React, { Component } from 'react';
import { isLoggedInAdmin, isLoggedInRegular, deleteTokens } from '../Auth.js';
import './UserOptions.css'
import { Link } from "react-router-dom";


export default class UserOptions extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      user_initials: localStorage.getItem("user_initials"),
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  render() {
    const { user_initials } = this.state;
    return (
      <div>
        <button className='logout' onClick={this.showMenu}>
          {user_initials}
        </button>
        {
          this.state.showMenu
            ? (
              <div
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Link to='/'>
                  <button
                    className='dropdown'
                    onClick={() => {
                      deleteTokens();
                      isLoggedInAdmin();
                      isLoggedInRegular();
                      window.location.reload();
                    }}
                  > Logout </button>
                </Link>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}