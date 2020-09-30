import React, { Component } from 'react';
import './combatRatingSuggestion.css';
import {v4 as uuidv4 } from 'uuid';

 class CombatRatingSuggestion extends Component {

    state = {
            combatRating: '',
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
            baseStats: [],
    }

    // Used to generate a UUID
    generateUuid(){
        const uniqueId = uuidv4();
        return uniqueId;
    }

    //  on submit, will grab the information from the selected combat rating and
    //render the stats out on the screen as well as update the monster card
    handleSubmit = async (e) => {
        e.preventDefault()        
        //  compairs the combat rating gathers from the options to see if any
        //match in base stats and saves that object to combatRatingStats
        //waits for savingUpdatedMonsterInfo to finish then it continues
        await this.savingUpdatedMonsterInfo();

        this.monsterBaseStatsRender();
        this.props.updateMonsterStartingPoint(this.state)
    }

    //  Saved the monster info from the form to the state
    savingUpdatedMonsterInfo() {
        const combatRating = document.getElementById("combatRatingSelection").value;
        //const showKey = document.getElementById("combatRatingSelection").key;

        let combatRatingStats = {};
        let baseStats = this.props.startingValues;
        for(let i = 0; i < baseStats.length; i++) {
            if(combatRating === baseStats[i].combat_rating) {
                combatRatingStats = baseStats[i];
                this.setState({combatRating: combatRatingStats.combat_rating});
                this.setState({proficiencyBonus: combatRatingStats.proficiencybonus});
                this.setState({armorClassSuggestion: combatRatingStats.armorclasssuggestion});
                this.setState({armorClassStartingPoint: combatRatingStats.armorclassstartingpoint});
                this.setState({hitPointsSuggestion: combatRatingStats.hitpointssuggestion});
                this.setState({hitPointsMin: combatRatingStats.hitpointsmin});
                this.setState({hitPointsMax: combatRatingStats.hitpointsmax});
                this.setState({attackBonusSuggestion: combatRatingStats.attackbonussuggestion});
                this.setState({attackBonus: combatRatingStats.attackbonus});
                this.setState({damagePerRoundSuggestion: combatRatingStats.damageperroundsuggestion});
                this.setState({saveDcSuggestion: combatRatingStats.savedcsuggestion});
                this.setState({saveDc: combatRatingStats.savedc});
            }
        }
    }

    //  If no combat rating is selected no stats will be rendered. If a CR is selected, it will render the stats
    monsterBaseStatsRender() {
        if(this.state.combatRating === "") {

            return

        } else {
            return (
                
                    <div className ='combatRatingSuggestionResults' id = "combatRatingSuggestionResults">
                        <p>Combat Rating {this.state.combatRating} suggetions</p>
                        <ul className='combatRatingForm'>
                            <li className='combatRatingListItem'>Armor Class {this.state.armorClassSuggestion}</li>
                            <li className='combatRatingListItem'>Hit Points {this.state.hitPointsSuggestion}</li>
                            <li className='combatRatingListItem'>Attack Bonus {this.state.attackBonusSuggestion}</li>
                            <li className='combatRatingListItem'>Damage per round {this.state.damagePerRoundSuggestion}</li>
                            <li className='combatRatingListItem'>Save dice check {this.state.saveDcSuggestion}</li>
                        </ul>
                    </div>
                
            )
        }
    }
    


    render() {

        return(
            <div id = "combatRatingSelectionContainer">            
                <form id="combatRatingSelectionForm" onSubmit = {this.handleSubmit}>
                    <label htlmfor="combatRatingSelection" id="combatRatingSelectionLabel">Select a combat rating</label>
                    <select name="combatRatingSelection" id="combatRatingSelection">
                        {this.props.startingValues.map( cr => 
                            <option
                                value = {cr.combat_rating}
                                key = {this.generateUuid()}
                            >{cr.combat_rating}</option>
                        )}
                    </select>
                    <button className="combatRatingSubmit">Submit</button>

                    <div id = "combatRatingSuggestionResultsContainer">
                        {this.monsterBaseStatsRender()}
                    </div>

                </form>
            </div>
        )
            

    }
}

export default CombatRatingSuggestion;
