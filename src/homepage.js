import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
//import './homepage.css'

class Homepage extends Component {
    state = {
        userId: 0
    }
    renderMainRoutes() {
        return (
            <>
                {}
            </>
        )
    }

    render() {

        return (
            <main>
                <h1>Dnd Monster Creator</h1>
                <p>You can create a dnd monster with this App.</p>
                <p>Adjust stats, add attacks, notes and more.</p>
                <p>Either sign in with your username to save monsters or just start creating a monster.</p>
            </main>
            
        )
    }
}

export default Homepage;