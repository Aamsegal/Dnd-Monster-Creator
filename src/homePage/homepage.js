import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePage.css'

class Homepage extends Component {

    render() {

        return (
            <main>
                <h1>Dnd Monster Creator</h1>
                <p>You can create a dnd monster with this App.</p>
                <p>Adjust stats, add attacks, notes and more.</p>
                <p>Either sign in with your username to save monsters or just start creating a monster.</p>
                <button><Link to='/application'>Continue</Link></button>
            </main>
            
        )
    }
}

export default Homepage;