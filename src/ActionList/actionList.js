import React, { Component } from 'react';
import './actionList.css'

class ActionList extends Component {
        state = {
            actions: [],
            reactions: [],
            skills: []
        };

        //  Itterates through the list of moves. If the move has an action style of 'Action' it adds it to the action list
        //Then it renders out the actionList
        actionListRender = () => {
            const actionList = [];
            const allMoves = this.props.monsterMoves;

            for(let i = 0; allMoves.length > i; i++) {
                if (allMoves[i].style === "Action") {
                    actionList.push(allMoves[i])
                }
            };
            

            return (
                actionList.map( action => 
                    <div className="singleActionContainer" id={action.action_name} key={action.id}>
                        <div className="singleActionCoreInfo">
                            <p className="singleActionName">{action.action_name}:</p><p className="singleActionDetails">{action.action_details}</p>
                        </div>

                        <div className="singleActionCombatDetails">
                            <p className="singleActionToHit">+{this.props.monsterInfo.mProf} to hit</p>
                            <p className="singleActionDamage">{action.damage_dice}+{this.props.monsterInfo.mAtk} Damage</p>
                        </div>
                        
                        <div className="singleActionButton">
                            <button className="singleActionDeleteButton" id={`button=${action.action_name}`} onClick={() => this.props.deleteMonsterAttack(action.id)}>Delete</button>
                        </div>
                        
                    </div>
                    
                )
            )
        };

        //  Itterates through the list of moves. If the move has an action style of 'Action' it adds it to the action list
        //Then it renders out the actionList
        reactionListRender() {
            const reactionList = [];
            const allMoves = this.props.monsterMoves;

            for(let i = 0; allMoves.length > i; i++) {
                if (allMoves[i].style === 'Reaction') {
                    reactionList.push(allMoves[i])
                }
            }
            

            return (
                reactionList.map( action => 
                    <div className="singleActionContainer" id={action.action_name} key={action.id}>
                        <div className="singleActionCoreInfo">
                            <p className="singleActionName">{action.action_name}:</p><p className="singleActionDetails">{action.action_details}</p>
                        </div>

                        <div className="singleActionCombatDetails">
                            <p className="singleActionToHit">+{this.props.monsterInfo.mProf} to hit</p>
                            <p className="singleActionDamage">{action.damage_dice}+{this.props.monsterInfo.mAtk} Damage</p>
                        </div>
                        
                        <div className="singleActionButton">
                            <button className="singleActionDeleteButton" id={`button=${action.action_name}`} onClick={() => this.props.deleteMonsterAttack(action.id)}>Delete</button>
                        </div>
                        
                    </div>
                    
                )
            )
        }

        //Itterates through the list of moves. If the move has an action style of 'Action' it adds it to the action list
            //Then it renders out the actionList
        skillListRender() {
            const skillList = [];
            const allMoves = this.props.monsterMoves;

            for(let i = 0; allMoves.length > i; i++) {
                if (allMoves[i].style === 'Skill') {
                    skillList.push(allMoves[i])
                }
            };
            

            return (
                skillList.map( action => 
                    <div className="singleActionContainer" id={action.action_name} key={action.id}>
                        <div className="singleActionCoreInfo">
                            <p className="singleActionName">{action.action_name}:</p><p className="singleActionDetails">{action.action_details}</p>
                        </div>

                        <div className="singleActionCombatDetails">
                            <p className="singleActionToHit">+{this.props.monsterInfo.mProf} to hit</p>
                            <p className="singleActionDamage">{action.damage_dice}+{this.props.monsterInfo.mAtk} Damage</p>
                        </div>
                        
                        <div className="singleActionButton">
                            <button className="singleActionDeleteButton" id={`button=${action.action_name}`} onClick={() => this.props.deleteMonsterAttack(action.id)}>Delete</button>
                        </div>
                        
                    </div>
                    
                )
            )
        };

        render () {
        
            return (
                <div className="monsterMovesContainer">

                    <div className="monsterActions">
                        <h1>Actions</h1>
                        {this.actionListRender()}
                    </div>

                    <div className="monsterReactions">
                        <h1>Reactions</h1>
                        {this.reactionListRender()}
                    </div>

                    <div className="monsterSkills">
                        <h1>Skills</h1>
                        {this.skillListRender()}
                    </div>

                </div>
            )
    }
}

export default ActionList;