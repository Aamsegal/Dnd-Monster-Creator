import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './loginBar.css';

var CryptoJS = require("crypto-js");

class LoginBar extends Component {

    loginRequest() {
        let username = window.prompt("Enter your username")

        if (username === null) {
            console.log('username was null')
            return
        }

        let password = window.prompt("Enter your password")

        if( password === null) {
            console.log("password was null")
            return
        }

        let hashedPassword = CryptoJS.MD5(password);

        let userLoginInfo = {username: username, password: hashedPassword}      

        this.props.userLogin(userLoginInfo)

    }

    createNewUser() {
        let username = window.prompt("Please choose a username");

        if (username === null) {
            return
        }

        let password = this.createUserPassword();

        if( password === null) {

            return
        }

        let hashedPassword = CryptoJS.MD5(password);

        this.props.newUserCreation(username, hashedPassword)
    }

    createUserPassword() {
        let password = window.prompt("Please choose a password");

        if( password === null) {
            console.log("password was null")
            return
        }


        if (password.length < 6 ) {
            window.alert('Please enter a password longer');
            this.createUserPassword()
        }

        let passwordRepeat = window.prompt("Please type your password again")

        if (password != passwordRepeat) {
            window.alert('Your passwords did not match. Please try again.');
            this.createUserPassword()
        }

        return password
    }
      

    render() {
        
        return (
            <div className="loginForm" id="loginForm">
                <button><Link to='/'>Homepage</Link></button>
                <button onClick={() => this.createNewUser()}>New User</button>
                <button onClick={() => this.loginRequest()}>Login</button>
            </div>
            
        )
    }
}

export default LoginBar;