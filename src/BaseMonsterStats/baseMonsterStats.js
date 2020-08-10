import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './baseMonsterStats.css'

class BaseMonsterStats extends Component {

    state = {
        mName: '',
        mType: '',
        mCr: 0,
        mArmor: 0,
        mHp: 0,
        mSpeed: '',
        mStr: 10,
        mDex: 10,
        mCon: 10,
        mInt: 10,
        mWis: 10,
        mCha: 10,
        mVuln: '',
        mRes: '',
        mImmune: '',
        mSenses: '',
        mLanguage: '',
        mEnotes: '',
        monsterMove: {}
    }

    handleSubmit = e => {
        e.preventDefault()        
        this.props.updateMonsterStats(this.state)
    }

    handleMovesSubmit = e => {
        e.preventDefault()
        const monster_id = uuidv4();
        const action_name = document.getElementById("action_name").value;
        const action_type = document.getElementById("action_type").value;
        const action_details = document.getElementById("action_details").value;
        const damage_dice = document.getElementById("damage_dice").value;
        const full_action = {id: monster_id, action_name: action_name, style: action_type, action_details: action_details,
            damage_dice: damage_dice};
        this.props.addMonsterAttack(full_action)
    }

    formVisibility(value) {

        if (value === 1) {
            document.getElementById('baseStatsForm').style.display = "block";
            document.getElementById('movesForm').style.display = "none";
        } else if (value === 2) {
            document.getElementById('baseStatsForm').style.display = "none";
            document.getElementById('movesForm').style.display = "block";
        }
    }

    render() {
        return (
            <div className = 'baseMonsterInfo'>

                <button onClick={() => this.formVisibility(1)}>Base Stats</button>
                <button onClick={() => this.formVisibility(2)}>Attack/Abilities/Skills</button>

                <div id="baseStatsForm">
                    <form onSubmit={this.handleSubmit}>

                        <label htmlFor="name">Name</label>
                        <input type="text" id="mName" name="name" placeholder="monster name" 
                        value={this.state.mName}
                        onChange= {(e) => this.setState({mName: e.currentTarget.value})}></input>

                        <label htmlFor="type">Monster Type</label>
                        <input type="text" id="mType" name="type" placeholder="large fiend, small"
                        value={this.state.mType}
                        onChange= {(e) => this.setState({mType: e.currentTarget.value})}></input>

                        <label htmlFor="mCr">Combat Rating</label>
                        <input type="number" id="mCr" name="combatRating" placeholder="0-20" min="0" max="20"
                        value={this.state.mCr}
                        onChange= {(e) => this.setState({mCr: e.currentTarget.value})}></input>

                        <label htmlFor="mProf">Proficiency</label>
                        <input type="number" id="mProf" name='proficienct' placeholder='2-15' min="2" max="15"
                        value={this.state.mProf} onChange= {(e) => this.setState({mProf: e.currentTarget.value})}></input>

                        <label htmlFor="mAtk">Attack Bonus</label>
                        <input type="number" id="mAtk" name='attackBonus' placeholder='3-15' min="3" max="15"
                        value={this.state.mAtk} onChange= {(e) => this.setState({mAtk: e.currentTarget.value})}></input>

                        <label htmlFor="mSaveDc">Save Dc</label>
                        <input type="number" id="mSaveDc" name='savedc' placeholder='10-23' min="10" max="25"
                        value={this.state.mSaveDc} onChange= {(e) => this.setState({mSaveDc: e.currentTarget.value})}></input>

                        <label htmlFor="armor">Armor Class</label>
                        <input type="number" id="mArmor" name="armor" placeholder="0-25" min="0" max="25"
                        value={this.state.mArmor}
                        onChange= {(e) => this.setState({mArmor: e.currentTarget.value})}></input>

                        <label htmlFor="hitpoints">Hitpoints</label>
                        <input type="number" id="mHp" name="hitpoints" placeholder="hitpoints"
                        value={this.state.mHp}
                        onChange= {(e) => this.setState({mHp: e.currentTarget.value})}></input>

                        <label htmlFor="speed">Movement Speed</label>
                        <input type="text" id="mSpeed" name="speed" placeholder="30 ft, 60 fly, 20 swim"
                        value={this.state.mSpeed}
                        onChange= {(e) => this.setState({mSpeed: e.currentTarget.value})}></input>

                        <label htmlFor="strength">Strength Score</label>
                        <input type="number" id="mStr" name="strength" placeholder="10" min="1" max="20"
                        value={this.state.mStr}
                        onChange= {(e) => this.setState({mStr: e.currentTarget.value})}></input>

                        <label htmlFor="dexterity">Dexterity Score</label>
                        <input type="number" id="mDex" name="dexterity" placeholder="10" min="1" max="20"
                        value={this.state.mDex}
                        onChange= {(e) => this.setState({mDex: e.currentTarget.value})}></input>

                        <label htmlFor="constitution">Constitution Score</label>
                        <input type="number" id="mCon" name="constitution" placeholder="10" min="1" max="20"
                        value={this.state.mCon}
                        onChange= {(e) => this.setState({mCon: e.currentTarget.value})}></input>

                        <label htmlFor="inteligence">Inteligence Score</label>
                        <input type="number" id="mInt" name="inteligence" placeholder="10" min="1" max="20"
                        value={this.state.mInt}
                        onChange= {(e) => this.setState({mInt: e.currentTarget.value})}></input>

                        <label htmlFor="wisdom">Wisdom Score</label>
                        <input type="number" id="mWis" name="wisdom" placeholder="10" min="1" max="20"
                        value={this.state.mWis}
                        onChange= {(e) => this.setState({mWis: e.currentTarget.value})}></input>

                        <label htmlFor="charisma">Charisma Score</label>
                        <input type="number" id="mCha" name="charisma" placeholder="10" min="1" max="20"
                        value={this.state.mCha}
                        onChange= {(e) => this.setState({mCha: e.currentTarget.value})}></input>

                        {/*<label htmlFor="str Save">Strength</label>
                        <input type="checkbox" name="str Save" id="strSave"></input>

                        <label htmlFor="dex Save">Dexterity</label>
                        <input type="checkbox" name="dex Save" id="dexSave"></input>

                        <label htmlFor="con Save">Constitution</label>
                        <input type="checkbox" name="con Save" id="conSave"></input>

                        <label htmlFor="int Save">Inteligence</label>
                        <input type="checkbox" name="int Save" id="intSave"></input>

                        <label htmlFor="wis Save">Wisdom</label>
                        <input type="checkbox" name="wis Save" id="wisSave"></input>

                        <label htmlFor="cha Save">Charisma</label>
                        <input type="checkbox" name="cha Save" id="chaSave"></input>*/}

                        <label htmlFor="damageVulnerability">Vulnerability</label>
                        <input type="text" id="vuln" name="vulnerabilty" placeholder="Holy, Necrotic, Slashing"
                        value={this.state.mVuln} onChange= {(e) => this.setState({mVuln: e.currentTarget.value})}></input>

                        <label htmlFor="damageResistance">Resistance</label>
                        <input type="text" id="resist" name="resistance" placeholder="Holy, Necrotic, Slashing"
                        value={this.state.mRes} onChange= {(e) => this.setState({mRes: e.currentTarget.value})}></input>

                        <label htmlFor="damageImmunities">Immunities</label>
                        <input type="text" id="immune" name="immunities" placeholder="Holy, Necrotic, Slashing"
                        value={this.state.mImmune} onChange= {(e) => this.setState({mImmune: e.currentTarget.value})}></input>

                        <label htmlFor="senses">Senses</label>
                        <input type="text" id='senses' name='senses' placeholder="Darkvision, Tremor Sense, Truesight"
                        value={this.state.mSenses} onChange= {(e) => this.setState({mSenses: e.currentTarget.value})}></input>

                        <label htmlFor="languages">Languages</label>
                        <input type="text" id="lang" name="language" placeholder="Common, Dwavin, Elvish"
                        value={this.state.mLanguage} onChange= {(e) => this.setState({mLanguage: e.currentTarget.value})}></input>

                        <label htmlFor="notes">Extra Notes</label>
                        <input type="text" id="notes" name="notes" placeholder="Monster notes"
                        value={this.state.mEnotes} onChange= {(e) => this.setState({mEnotes: e.currentTarget.value})}></input>

                        <button>Submit</button>
                    </form>
                </div>
                
                <div  id="movesForm" style={{display: 'none'}}>
                    <form onSubmit={this.handleMovesSubmit}>
                        <label htmlFor="action_name">Name</label>
                        <input type="text" id="action_name" name="action_name"></input>

                        <label htmlFor="action_type">Action Type</label>
                        <select id='action_type' name='action_type'>
                            <option value="Action" key="Action">Action</option>
                            <option value="Reaction" key="Reaction">Reaction</option>
                            <option value="Skill" key="Skill">Skill</option>
                        </select>

                        <label htmlFor="action_details">Details</label>
                        <input type="text" id="action_details" name="action_details" placeholder="The creature swings with its sword"></input>

                        <label htmlFor="damage_dice">Damage Dice</label>
                        <input type="text" id="damage_dice" name="damage_dice" placeholder="1d4, 1d8, 2d6"></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default BaseMonsterStats;

