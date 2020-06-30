import React, { Component } from 'react';
import './MonsterCard.css'

class BaseMonsterStats extends Component {
    render() {
        console.log(this.props)
        return (
            <div className = 'monsterCard'>
                <ul>
                    <li>Monster Name: {this.props.monsterInfo.monsterName}</li>
                    <li>Monster Type: {this.props.monsterInfo.monsterType}</li>
                    <li>Armor Class: {this.props.monsterInfo.armorClass}</li>
                    <li>Hit Points: {this.props.monsterInfo.hitPoints}</li>
                    <li>Speed: {this.props.monsterInfo.speed}</li>
                    <li>Strength: {this.props.monsterInfo.strength}</li>
                    <li>Dexterity: {this.props.monsterInfo.dexterity}</li>
                    <li>Constitution: {this.props.monsterInfo.constitution}</li>
                    <li>Inteligence: {this.props.monsterInfo.inteligence}</li>
                    <li>Wisdom: {this.props.monsterInfo.wisdom}</li>
                    <li>Charisma: {this.props.monsterInfo.charisma}</li>
                </ul>
            </div>
        )
    }
}

export default BaseMonsterStats;