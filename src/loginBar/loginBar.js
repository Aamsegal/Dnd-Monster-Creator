import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './loginBar.css';

var CryptoJS = require("crypto-js");

class LoginBar extends Component {

    loginRequest() {
        let username = window.prompt("Enter your username")

        if (username === null) {
            return
        }

        let password = window.prompt("Enter your password")

        if( password === null) {
            return
        }

        let hashedPassword = CryptoJS.MD5(password).toString();

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

        let hashedPassword = CryptoJS.MD5(password).toString();

        this.props.newUserCreation(username, hashedPassword)
    }

    createUserPassword() {
        let password = window.prompt("Please choose a password");

        if( password === null) {
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

    loggedInUser = () => {
        const loggedInUsername = this.props.username;
        if (loggedInUsername === '') {
            return <p>No user</p>
        } else {
        return <p>Current User: {loggedInUsername}</p>
        }
    }

    formVsOutputVisibility(value) {
        if (value === 1) {
            document.getElementById('monsterCardOn').style.display = "block";
            document.getElementById('monsterStatsOn').style.display = "none";

            document.getElementById('combatRatingSelectionContainer').style.display = "block";
            document.getElementById('loadingMonsters').style.display = "block";
            document.getElementById('baseMonsterInfo').style.display = "block";

            document.getElementById('monsterCard').style.display = "none";
        } else if (value === 2) {
            document.getElementById('monsterCardOn').style.display = "none";
            document.getElementById('monsterStatsOn').style.display = "block";

            document.getElementById('combatRatingSelectionContainer').style.display = "none";
            document.getElementById('loadingMonsters').style.display = "none";
            document.getElementById('baseMonsterInfo').style.display = "none";

            document.getElementById('monsterCard').style.display = "block";
        }

    }
      

    render() {
        
        return (
            <div className="loginForm" id="loginForm">
                <div id = "loginButtons">
                    <button className="loginButton"><Link to='/'>Homepage</Link></button>
                    <button className="loginButton" onClick={() => this.createNewUser()}>New User</button>
                    <button className="loginButton" onClick={() => this.loginRequest()}>Login</button>
                    
                </div>

                <div className="monsterStats_MonsterCardToggle">
                    <button className="monsterStatsOn" id="monsterStatsOn" onClick={() => this.formVsOutputVisibility(1)}>Monster Stats</button>
                    <button className="monsterCardOn" id="monsterCardOn" onClick={() => this.formVsOutputVisibility(2)}>Monster Card</button>
                </div>
                
                
                <div id = "currentUsername">
                    {this.loggedInUser()}
                </div>
                
            </div>
            
        )
    }
}

export default LoginBar;