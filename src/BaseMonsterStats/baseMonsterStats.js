import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './baseMonsterStats.css'

class BaseMonsterStats extends Component {

    state = {
        mName: '',
        mType: '',
        mCr: 0,
        mArmor: 0,
        mAtk: 0,
        mHp: 0,
        mSpeed: '',
        mProf: 0,
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
        //this.props.updateMonsterStats(this.state)
    }

    handleMovesSubmit = e => {
        e.preventDefault()
        const moves_id = uuidv4();
        const action_name = document.getElementById("action_name").value;
        const action_type = document.getElementById("action_type").value;
        const action_details = document.getElementById("action_details").value;
        const damage_dice = document.getElementById("damage_dice").value;
        const full_action = {id: moves_id, action_name: action_name, style: action_type, action_details: action_details,
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
            <div className = 'baseMonsterInfo' id = "baseMonsterInfo">

                <button onClick={() => this.formVisibility(1)}>Base Stats</button>
                <button onClick={() => this.formVisibility(2)}>Attack/Abilities/Skills</button>

                <div id="baseStatsForm">

                        <div id = "inputContainer">
                            <label htmlFor="name" id="inputLabel">Name</label>
                            <input className="monsterStatsInput" type="text" id="mName" name="mname" placeholder="monster name" 
                            value={this.props.monsterStats.mName}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="type" id="inputLabel">Monster Type</label>
                            <input className="monsterStatsInput" type="text" id="mType" name="type" placeholder="large fiend, small"
                            value={this.props.monsterStats.mType}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="mCr" id="inputLabel">Combat Rating</label>
                            <input className="monsterStatsInput" type="number" id="mCr" name="combatRating" placeholder="0-30" min="0" max="30"
                            value={this.props.monsterStats.mCr}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="mProf" id="inputLabel">Proficiency</label>
                            <input className="monsterStatsInput" type="number" id="mProf" name='proficienct' placeholder='2-15' min="2" max="15"
                            value={this.props.monsterStats.mProf} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="mAtk" id="inputLabel">Attack Bonus</label>
                            <input className="monsterStatsInput" type="number" id="mAtk" name='attackBonus' placeholder='3-15' min="3" max="15"
                            value={this.props.monsterStats.mAtk} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="mSaveDc" id="inputLabel">Save Dc</label>
                            <input className="monsterStatsInput" type="number" id="mSaveDc" name='savedc' placeholder='10-23' min="10" max="25"
                            value={this.props.monsterStats.mSaveDc} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="armor" id="inputLabel">Armor Class</label>
                            <input className="monsterStatsInput" type="number" id="mArmor" name="armor" placeholder="0-25" min="0" max="25"
                            value={this.props.monsterStats.mArmor}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="hitpoints" id="inputLabel">Hitpoints</label>
                            <input className="monsterStatsInput" type="number" id="mHp" name="hitpoints" placeholder="hitpoints"
                            value={this.props.monsterStats.mHp}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="speed" id="inputLabel">Movement Speed</label>
                            <input className="monsterStatsInput" type="text" id="mSpeed" name="speed" placeholder="30 ft, 60 fly, 20 swim"
                            value={this.props.monsterStats.mSpeed}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="strength" id="inputLabel">Strength (STR)</label>
                            <input className="monsterStatsInput" type="number" id="mStr" name="strength" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mStr}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>

                        <div id = "inputContainer">
                            <label htmlFor="dexterity" id="inputLabel">Dexterity (DEX)</label>
                            <input className="monsterStatsInput" type="number" id="mDex" name="dexterity" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mDex}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="constitution" id="inputLabel">Constitution (CON)</label>
                            <input className="monsterStatsInput" type="number" id="mCon" name="constitution" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mCon}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="inteligence" id="inputLabel">Inteligence (INT)</label>
                            <input className="monsterStatsInput" type="number" id="mInt" name="inteligence" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mInt}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="wisdom" id="inputLabel">Wisdom (WIS)</label>
                            <input className="monsterStatsInput" type="number" id="mWis" name="wisdom" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mWis}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="charisma" id="inputLabel">Charisma (CHA)</label>
                            <input className="monsterStatsInput" type="number" id="mCha" name="charisma" placeholder="10" min="1" max="20"
                            value={this.props.monsterStats.mCha}
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="vulnerability" id="inputLabel">Vulnerability</label>
                            <input className="monsterStatsInput" type="text" id="mVul" name="vulnerabilty" placeholder="Holy, Necrotic, Slashing"
                            value={this.props.monsterStats.mVuln} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                           <label htmlFor="resistance" id="inputLabel">Resistance</label>
                            <input className="monsterStatsInput" type="text" id="mRes" name="resistance" placeholder="Holy, Necrotic, Slashing"
                            value={this.props.monsterStats.mRes} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                           <label htmlFor="immunities" id="inputLabel">Immunities</label>
                            <input className="monsterStatsInput" type="text" id="mImmune" name="immunities" placeholder="Holy, Necrotic, Slashing"
                            value={this.props.monsterStats.mImmune} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                           <label htmlFor="senses" id="inputLabel">Senses</label>
                            <input className="monsterStatsInput" type="text" id='mSenses' name='senses' placeholder="Darkvision, Tremor Sense, Truesight"
                            value={this.props.monsterStats.mSenses} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="languages" id="inputLabel">Languages</label>
                            <input className="monsterStatsInput" type="text" id="mLanguage" name="language" placeholder="Common, Dwavin, Elvish"
                            value={this.props.monsterStats.mLanguage} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        <div id = "inputContainer">
                            <label htmlFor="notes" id="inputLabel">Extra Notes</label>
                            <input className="monsterStatsInput" type="text" id="mEnotes" name="notes" placeholder="Monster notes"
                            value={this.props.monsterStats.mEnotes} 
                            onChange= {(e) => this.props.updateMonsterStats(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        
                        {/*<button>Submit</button>*/}

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

