import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePage.css'

class Homepage extends Component {


    moreInfoButton() {
        document.getElementById('moreInfoPopup').style.display = "block";
    }

    closeMoreInfo() {
        document.getElementById('moreInfoPopup').style.display = "none"
    }


    render() {

        return (
            <header className = "introductionContainer">

                <div className = "introduction" id = "introduction">
                    <h1>Dnd Monster Creator</h1>
                    <h3>Create, Save, Enjoy!</h3>
                    <Link to='/application'><button className='homepageButton'>Get Started</button></Link>
                    <button className='homepageButton' onClick={this.moreInfoButton}>More Info</button>
                </div>

                <div className = "moreInfoPopup" id="moreInfoPopup">
                    <div className = "moreInfoPopup-Content" id="moreInfoPopup-Content">
                        <p>This tool will allow you to build your own D&d Monster. You can log in to save your moster, 
                        or just take a screen shot when you are done. If you are stuck, feel free to choose a
                        combat rating from the suggestion bar to get a starting point for your creature. Enjoy!</p>
                       
                        <div className = "close-Button-div" id = "close-Button-div">
                            <button onClick={this.closeMoreInfo}>Close</button>
                        </div>
                        
                    </div>
                </div>

            </header>
            
        )
    }
}

export default Homepage;