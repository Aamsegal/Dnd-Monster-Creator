import React, { Component } from 'react';
import './LoadingMonsters.css';
import config from '../config'

class LoadingMonsters extends Component {
    state = {
        monsters: []
    }



    selectMonster = e => {
        e.preventDefault()
        console.log('selectMonster runs')
    }

    reloadMonsters = e => {
        e.preventDefault()
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/monsters/userId/${this.props.userId}`)
        ])
            .then(([monsterRes]) => {
                if(!monsterRes.ok)
                    return monsterRes.json().then(e => Promise.reject(e));
                return Promise.all([monsterRes.json()])
            })

            .then(([monsters]) => {
                this.setState({monsters})
            })

            .catch(error => {
                console.error({error})
            })   
    }

    render() {
        return(
            <div className = 'loadingMonsters'>
                <label htlmfor="monsterListImport">Click Select to choose one of your monster. Click reload to reload the list of your monsters.</label>
                <select name='monsterListImport' id='monsterListImport'>
                    {this.state.monsters.map( monster => 
                        <option value={monster.id} key={`monster_${monster.id}`}>{monster.monster_name}</option>
                    )}
                </select>
                <button name='selectMonsterButton' id='selectMonsterButton' onClick={this.selectMonster}>Select</button>
                <button name='reloadMonstersButton' id='reloadMonstersButton' onClick={this.reloadMonsters}>Load Monsters</button>
            </div>
            
        )
    }
}

export default LoadingMonsters;