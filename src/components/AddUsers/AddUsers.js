import './AddUsers.css';
import React from 'react';
import { AddNewUser } from '../../lib/api.js'

export default class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
    }
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleFirstnameChange(event) {
    this.setState({ firstname: event.target.value });
  }
  handleLastnameChange(event) {
    this.setState({ lastname: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const newUser = { "username": this.state.username, "password": this.state.password, "first_name": this.state.firstname, "last_name": this.state.lastname, "email": this.state.email }
    AddNewUser(newUser)
  }
  render() {
    const { username, password, firstname, lastname, email } = this.state;
    return (
      <form className="addUserSpace" onSubmit={event => this.handleSubmit(event)}>
        <div className="addRegUserHeader">Add regular user</div>
        <div className="newUserInputs">
          <div>
            <label className="newUserLeft"> First name: </label>
            <input
              className="newUserRight"
              type="text"
              value={firstname}
              required
              onChange={event => this.handleFirstnameChange(event)}
            /></div>
          <div>
            <label className="newUserLeft"> Last name:</label>
            <input
              className="newUserRight"
              type="text"
              value={lastname}
              required
              onChange={event => this.handleLastnameChange(event)}
            /></div>
          <div>
            <label className="newUserLeft"> Email:</label>
            <input
              className="newUserRight"
              type="email"
              value={email}
              required
              onChange={event => this.handleEmailChange(event)}
            /> </div>
          <div>
            <label className="newUserLeft"> Username:</label>
            <input
              className="newUserRight"
              type="text"
              value={username}
              required
              onChange={event => this.handleUsernameChange(event)}
            /> </div>
          <div>
            <label className="newUserLeft"> Password: </label>
            <input
              className="newUserRight"
              type="text"
              value={password}
              required
              onChange={event => this.handlePasswordChange(event)}
            /></div>
        </div>
        <input className="submitNewUser" type="submit" value="Submit" />
      </form>
    );
  }
}