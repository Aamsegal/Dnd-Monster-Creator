import React, { Component } from 'react';
import './actionList.css'

class ActionList extends Component {
    render () {
        return (
            <div id="monsterMovesContainer" class="monsterMovesContainer">
                {this.props.monsterMoves.map( action => 
                    <span id={action.action_name}>
                        <p>{action.action_name}</p>
                        <p>{action.action_type}</p>
                        <p>{action.action_details}</p>
                        <p>+{this.props.monsterInfo.mProf} to hit</p>
                        <p>{action.damage_dice}+{this.props.monsterInfo.mAtk} Damage</p>
                    </span>
                    
                )}
            </div>
        )
    }
}

export default ActionList;