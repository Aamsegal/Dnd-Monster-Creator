import React, { Component } from 'react';
import './baseMonsterStats.css'

class BaseMonsterStats extends Component {
    state = {
        monsterName: '',
        monsterType: '',
        armorClass: 0,
        hitPoints: 0,
        speed: 0,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        inteligence: 10,
        wisdom: 10,
        charisma: 10
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
    }
    render() {

        return (
            <div className = 'baseMonsterInfo'>
                <form onSubmit= {this.handleSubmit}>

                    <label htmlFor="name">Name</label>
                    <input type="text" id="mName" name="name" placeholder="monster name" 
                    onChange= {(e) => this.setState({monsterName: e.currentTarget.value})}></input>

                    <label htmlFor="type">Monster Type</label>
                    <input type="text" id="mType" name="type" placeholder="large fiend, small"
                    onChange= {(e) => this.setState({monsterType: e.currentTarget.value})}></input>

                    <label htmlFor="armor">Armor Class</label>
                    <input type="number" id="mArmor" name="armor" placeholder="5-25" min="5" max="25"
                    onChange= {(e) => this.setState({armorClass: e.currentTarget.value})}></input>

                    <label htmlFor="hitpoints">Hitpoints</label>
                    <input type="number" id="mHp" name="hitpoints" placeholder="hitpoints"
                    onChange= {(e) => this.setState({hitPoints: e.currentTarget.value})}></input>

                    <label htmlFor="speed">Movement Speed</label>
                    <input type="text" id="mSpeed" name="speed" placeholder="30 ft, 60 fly, 20 swim"
                    onChange= {(e) => this.setState({speed: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Strength Score</label>
                    <input type="number" id="mStr" name="strength" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({strength: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Dexterity Score</label>
                    <input type="number" id="mDex" name="dexterity" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({dexterity: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Constitution Score</label>
                    <input type="number" id="mCon" name="constitution" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({constitution: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Inteligence Score</label>
                    <input type="number" id="mInt" name="inteligence" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({inteligence: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Wisdom Score</label>
                    <input type="number" id="mWis" name="wisdom" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({wisdom: e.currentTarget.value})}></input>

                    <label htmlFor="strength">Charisma Score</label>
                    <input type="number" id="mCha" name="charisma" placeholder="10" min="1" max="20"
                    onChange= {(e) => this.setState({charisma: e.currentTarget.value})}></input>

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default BaseMonsterStats;

