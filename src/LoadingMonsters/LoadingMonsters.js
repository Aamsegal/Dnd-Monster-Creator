import React, { Component } from 'react';
import './LoadingMonsters.css';

class LoadingMonsters extends Component {
    state = {
        monsters: []
    }



    selectMonster = e => {
        e.preventDefault()
        const monsterList = this.props.monsters
        const selectedMonsterid = document.getElementById('monsterListImport').value;
        let selectedMonster = []

        for (let i=0; i < monsterList.length; i++) {
            if(monsterList[i].id === selectedMonsterid) {
                selectedMonster = monsterList[i]
            }
        }
        this.props.loadSavedMonsterStats(selectedMonster)
    }

    deleteMonster = e => {
        e.preventDefault()
        const currentMonsterId = document.getElementById('monsterListImport').value;
        let currentMonsterName = '';

        this.props.monsters.forEach((monster) => {
            if (monster.id === currentMonsterId) {
                currentMonsterName = monster.monster_name
            }
        })

        if (window.confirm(`Are you sure you want to delete ${currentMonsterName}`) === true) {
            this.props.deleteMonster(currentMonsterId)
        } 
    }

    createNewMonster = e => {
        e.preventDefault()
        this.props.createNewMonster()
    }

    render() {
        return(
            <div className = 'loadingMonsters' id = "loadingMonsters">
                <div id = "monsterSelection">
                    <label htlmfor="monsterListImport" id = "monsterListImportLabel">Load one of our saved monsters.</label>
                    <select name='monsterListImport' id='monsterListImport'>
                    {this.props.monsters.map( monster => 
                        <option value={monster.id} key={`monster_${monster.id}`}>{monster.monster_name}</option>
                    )}
                    </select>
                    <button name='selectMonsterButton' id='selectMonsterButton' onClick={this.selectMonster}>Select</button>
                </div>
                <button name='deleteMonsterButton' id="deleteMonsterButton" onClick={this.deleteMonster}>Delete</button>
                <button name='createNewMonsterButton' id="createNewMonsterButton" onClick={this.createNewMonster}>New</button>
            </div>
            
        )
    }
}

export default LoadingMonsters;