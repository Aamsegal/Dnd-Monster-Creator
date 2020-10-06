import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './loginBar.css';

var CryptoJS = require("crypto-js");

class LoginBar extends Component {

    //  Logic for showing and hiding the user creation button and login button
    userCreation_and_LoginBar_Toggle(buttonValue) {
        if (buttonValue === 1) {
            document.getElementById('userCreationFormContainer').style.display = "block";
        } else if (buttonValue === 2) {
            document.getElementById('userCreationFormContainer').style.display = "none";

            document.getElementById('userCreationError').innerHTML = ""; //Sets error message to nothing

            //  Sets all user creation input fields to empty
            document.getElementById('userNameInput').value = "";
            document.getElementById('userPasswordInput').value = "";
            document.getElementById('userRepeatPasswordInput').value = "";

        } else if (buttonValue === 3) {
            document.getElementById('userLoginFormContainer').style.display = "block";
        } else {
            document.getElementById('userLoginFormContainer').style.display = "none";

            document.getElementById('userCreationErrorLogin').innerHTML = ""; //Sets error message to nothing

            //  Sets all user creation input fields to empty
            document.getElementById('userNameInputLogin').value = "";
            document.getElementById('userPasswordInputLogin').value = "";
        }
    };

    // User login request. Grabs all the unputs from the forms and then sends them up to the api call in App.js
    loginRequest() {
        let username = document.getElementById('userNameInputLogin').value;

        if (username === '') {
            document.getElementById('userCreationErrorLogin').innerHTML = "Missing Username!";
            return
        }

        let password = document.getElementById('userPasswordInputLogin').value;

        if( password === '') {
            document.getElementById('userCreationErrorLogin').innerHTML = "Missing Password!";
            return
        } else {
            document.getElementById('userCreationErrorLogin').innerHTML = "";
            document.getElementById('userNameInputLogin').value = "";
            document.getElementById('userPasswordInputLogin').value = "";

            document.getElementById('userLoginFormContainer').style.display = "none";

            //  Hashed both the username and password before sending it to the api call
            let hashedPassword = CryptoJS.MD5(password).toString();

            let userLoginInfo = {username: username, password: hashedPassword};      

            this.props.userLogin(userLoginInfo)
        }

    };

    //  User creation request. Grabs all the unputs from the forms and then sends them up to the api call in App.js
    createNewUser() {

        let username = document.getElementById('userNameInput').value;

        if (username === '') {
            document.getElementById('userCreationError').innerHTML = 'Missing Username!';
            return
        }
        
        //  Uses createUserPassword function to check all the requirements for passwords such as length and it matching
        //with the repeated password.
        let password = this.createUserPassword();

        if( password === null) {
            
            return

        } else {
            // Emptys the form values so they will be empty when leave the user creation form
            document.getElementById('userNameInput').value = "";
            document.getElementById('userPasswordInput').value = "";
            document.getElementById('userRepeatPasswordInput').value = "";


            document.getElementById('userCreationFormContainer').style.display = "none";
            
            let hashedPassword = CryptoJS.MD5(password).toString();

            this.props.newUserCreation(username, hashedPassword);
        }
    };

    //  Returns errors when the password is either too short or does not match the reapeated password
    createUserPassword() {
        let password = document.getElementById('userPasswordInput').value;

        if( password === null) {
            document.getElementById('userCreationError').innerHTML = 'Missing Password!';
            return
        }


        if (password.length < 6 ) {
            document.getElementById('userCreationError').innerHTML = 'Password must be atleast 6 characters!';
            password = null;

        } else {

            let passwordRepeat = document.getElementById('userRepeatPasswordInput').value;

            //  Checks if the two passwords are the same
            if (password != passwordRepeat) {
                document.getElementById('userCreationError').innerHTML = 'Passwords do not match!';
                password = null;

            }  else {
                //  If the two passwords are the same. It resets the inner html since we have already stored it
                document.getElementById('userCreationError').innerHTML = '';
            }
        }

        return password
    };

    //  Shows the user who is logged in if anyone
    loggedInUser = () => {
        const loggedInUsername = this.props.username;
        if (loggedInUsername === '') {
            return <p>No user</p>
        } else {
        return <p>Current User: {loggedInUsername}</p>
        }
    };

    // Similar to up top, this is the logic to show/hide the monster Stats form and the monster card form. This is only
    //used on mobile when we want to show one or the other because of space.
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

    };
      

    render() {
        
        return (
            <div className="login_Bar_Container">
                <div className="loginForm" id="loginForm">
                    <div id = "loginButtons">
                        <button className="loginButton"><Link to='/'>Homepage</Link></button>
                        <button className="loginButton" onClick={() => this.userCreation_and_LoginBar_Toggle(1)}>New User</button>
                        <button className="loginButton" onClick={() => this.userCreation_and_LoginBar_Toggle(3)}>Login</button>
                        
                    </div>

                    <div className="monsterStats_MonsterCardToggle">
                        <button className="monsterStatsOn" id="monsterStatsOn" onClick={() => this.formVsOutputVisibility(1)}>Monster Stats</button>
                        <button className="monsterCardOn" id="monsterCardOn" onClick={() => this.formVsOutputVisibility(2)}>Monster Card</button>
                    </div>
                    
                    
                    <div id = "currentUsername">
                        {this.loggedInUser()}
                    </div>

                    
                    
                </div>
                
                <div className="userCreationFormContainer" id="userCreationFormContainer">

                    <div className="smallerUserCreationFormContainer" id="smallerUserCreationFormContainer">

                        <button className='xButton' onClick={() => this.userCreation_and_LoginBar_Toggle(2)}>X</button>

                        <div className="userCreationHeaderContainer">
                            <h1 className="userCreationHeader">Monster Creator</h1>
                            <h1 className="userCreationHeader">User Creation</h1>
                        </div>
                        
                        <form className="userCreationForm">
                    
                            <input className='userCreationInput' id='userNameInput' type='text' placeholder='Username' ></input>
                            
                            <input className='userCreationInput' id='userPasswordInput' type='text' placeholder='Password'></input>
                            
                            <input className='userCreationInput' id='userRepeatPasswordInput' type='text' placeholder='Repeat Password'></input>
                            
                            
                        </form>

                        <div className="userCreationFormButtons">
                            <button className='userCreationSubmitButton' type='button' onClick={() => this.createNewUser()}>Create User</button>
                        </div>

                        <p className="userCreationError" id="userCreationError"></p>
                    </div>

                </div>

                <div className="userLoginFormContainer" id="userLoginFormContainer">

                    <div className="smallerUserLoginFormContainer" id="smallerUserLoginFormContainer">

                        <button className='xButton' onClick={() => this.userCreation_and_LoginBar_Toggle(4)}>X</button>

                        <div className="userLoginHeaderContainer">
                            <h1 className="userLoginHeader">Monster Creator</h1>
                            <h1 className="userLoginHeader">Login</h1>
                        </div>
                        
                        <form className="userLoginForm">
                    
                            <input className='userLoginInput' id='userNameInputLogin' type='text' placeholder='Username' ></input>
                            
                            <input className='userLoginInput' id='userPasswordInputLogin' type='text' placeholder='Password'></input>                        
                            
                        </form>

                        <div className="userLoginFormButtons">
                            <button className='userLoginSubmitButton' type='button' onClick={() => this.loginRequest()}>Create User</button>
                        </div>

                        <p className="userCreationErrorLogin" id="userCreationErrorLogin"></p>
                    </div>

                </div>

            </div>
        )
    };
}

export default LoginBar;