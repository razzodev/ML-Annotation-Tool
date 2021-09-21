import React from 'react'
import './Login.css';
import {hostname} from '../../lib/api'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange=event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }
    handleSubmit(event) {
      
      const hostname = window.location.hostname
      const port = 
            event.preventDefault() ;
            let url = `http://${hostname}:5000/login/verify`
            let formData  = new FormData();
            let data = this.state;
            for(let name in data) {
              formData.append(name, data[name]);
            }
            fetch(url, {
              method: 'POST',
              // headers: {
              //   'Access-Control-Allow-Origin':'*'
              // },
              body: formData
            }).then( res => res.json())
            .then(data=>{
              localStorage.setItem('access_token', data.access_token);
              localStorage.setItem('username', data.username);
              localStorage.setItem( 'user_initials', data.user_initials);
              localStorage.setItem( 'user_type', data.user_type);
              if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
                window.location.replace("/")
              }else{
                  alert(data.error);
              }
            }).catch(err => console.log(err));
    }
    render() {
        const { username, password } = this.state;
        return (
            <form className = "loginSpace" onSubmit={event => this.handleSubmit(event)}>
                <div className="loginHeader">Login</div>
                <div className="loginInputs">
                <div>
                <label className="loginLeft"> Username </label>
                <input
                    className="loginRight"
                    type="text"
                    name = "username"
                    placeholder='username'
                    value={username}
                    required
                    onChange={this.handleChange}
                /></div>
                <div>
                <label className="loginLeft"> Password </label>
                <input
                  className="loginRight"
                    type="text"
                    name = "password"
                    placeholder='password'
                    value={password}
                    required
                    onChange={this.handleChange}
                /></div>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}