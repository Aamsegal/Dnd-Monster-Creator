import React, {Component} from 'react';
import './loginBar.css';


class LoginBar extends Component {

    loginRequest() {
        let username = window.prompt("Enter your username")
        let userid = window.prompt("Enter your id")
        let userLoginInfo = {id: userid, username: username}
        this.props.userLogin(userLoginInfo)

    }

    createNewUser() {
        let username = window.prompt("Please choose a username")
        this.props.newUserCreation(username)
    }

    render() {
        
        return (
            <div className="loginForm">
                {/*<form onSubmit={this.loginRequest}>

                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"></input>

                    <label htmlFor="userid">User Id</label>
                    <input type="text" id="userid" name="userid"></input>
                    
                    <button>Login</button>
                </form>*/}
                <button onClick={() => this.createNewUser()}>New User</button>
                <button onClick={() => this.loginRequest()}>Login</button>
            </div>
            
        )
    }
}

export default LoginBar;