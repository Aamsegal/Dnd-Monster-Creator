import React, { Component } from 'react';
import baseStats from './combatRatingStats';
import './combatRatingSuggestion.css'
import {v4 as uuidv4 } from 'uuid'

 class CombatRatingSuggestion extends Component {

    state = {
            combatRating: "",
            proficiencyBonus: 0,
            armorClassSuggestion: "",
            armorClassStartingPoint: 0,
            hitPointsSuggestion: "",
            hitPointsMin: 0,
            hitPointsMax: 0,
            attackBonusSuggestion: "",
            attackBonus: 0,
            damagePerRoundSuggestion: "",
            saveDcSuggestion: "",
            saveDc: 0,
    }

    generateUuid(){
        const uniqueId = uuidv4();
        return uniqueId;
    }

    handleSubmit = async (e) => {
        e.preventDefault()        
        //  compairs the combat rating gathers from the options to see if any
        //match in base stats and saves that object to combatRatingStats
        //waits for savingUpdatedMonsterInfo to finish then it continues
        await this.savingUpdatedMonsterInfo();

        this.monsterBaseStatsRender();
        this.props.updateMonsterStartingPoint(this.state)
    }

    savingUpdatedMonsterInfo() {
        const combatRating = document.getElementById("combatRatingSelection").value;
        const showKey = document.getElementById("combatRatingSelection").key;

        let combatRatingStats = {};
        for(let i = 0; i < baseStats.length; i++) {
            if(combatRating === baseStats[i].combatRating) {
                combatRatingStats = baseStats[i];
                this.setState({combatRating: combatRatingStats.combatRating});
                this.setState({proficiencyBonus: combatRatingStats.proficiencyBonus});
                this.setState({armorClassSuggestion: combatRatingStats.armorClassSuggestion});
                this.setState({armorClassStartingPoint: combatRatingStats.armorClassStartingPoint});
                this.setState({hitPointsSuggestion: combatRatingStats.hitPointsSuggestion});
                this.setState({hitPointsMin: combatRatingStats.hitPointsMin});
                this.setState({hitPointsMax: combatRatingStats.hitPointsMax});
                this.setState({attackBonusSuggestion: combatRatingStats.attackBonusSuggestion});
                this.setState({attackBonus: combatRatingStats.attackBonus});
                this.setState({damagePerRoundSuggestion: combatRatingStats.damagePerRoundSuggestion});
                this.setState({saveDcSuggestion: combatRatingStats.saveDcSuggestion});
                this.setState({saveDc: combatRatingStats.saveDc});
            }
        }
    }


    monsterBaseStatsRender() {
        if(this.state.combatRating === "") {
            return (
                <p>Choose a monster level</p>
            )
        } else {
            return (
                <div>
                    <p>Combat Rating {this.state.combatRating} suggetions</p>
                    <ul>
                        <li>Armor Class {this.state.armorClassSuggestion}</li>
                        <li>Hit Points {this.state.hitPointsSuggestion}</li>
                        <li>Attack Bonus {this.state.attackBonusSuggestion}</li>
                        <li>Damage per round {this.state.damagePerRoundSuggestion}</li>
                        <li>Save dice check {this.state.saveDcSuggestion}</li>
                    </ul>
                </div>
                
            )
        }
    }
    


    render() {

        return(
            <form onSubmit = {this.handleSubmit}>
                <lable htlmfor="combatRatingSelection">Select a combat raiting</lable>
                <select name="combatRatingSelection" id="combatRatingSelection">
                    {baseStats.map( cr => 
                        <option
                            value = {cr.combatRating}
                            key = {this.generateUuid()}
                        >{cr.combatRating}</option>
                        )}
                </select>
                <button>Submit</button>
                <h1>{this.monsterBaseStatsRender()}</h1>
            </form>
        )
            

    }
}

export default CombatRatingSuggestion;