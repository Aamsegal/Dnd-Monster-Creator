import React, { Component } from 'react';
import './MonsterCard.css'

class BaseMonsterStats extends Component {
    render() {
        const strMod = Math.floor(parseInt((this.props.monsterInfo.mStr)-10)/2)
        const dexMod = Math.floor(parseInt((this.props.monsterInfo.mDex)-10)/2)
        const conMod = Math.floor(parseInt((this.props.monsterInfo.mCon)-10)/2)
        const intMod = Math.floor(parseInt((this.props.monsterInfo.mInt)-10)/2)
        const wisMod = Math.floor(parseInt((this.props.monsterInfo.mWis)-10)/2)
        const chaMod = Math.floor(parseInt((this.props.monsterInfo.mCha)-10)/2)
        //console.log(this.props)
        return (
            <div className = 'monsterCard'>
                <ul>
                    <li>Monster Name: {this.props.monsterInfo.mName}</li>
                    <li>Monster Type: {this.props.monsterInfo.mType}</li>
                    <li>Armor Class: {this.props.monsterInfo.mArmor}</li>
                    <li>Hit Points: {this.props.monsterInfo.mHp}</li>
                    <li>Speed: {this.props.monsterInfo.mSpeed}</li>
                    <li>Strength: {this.props.monsterInfo.mStr} ({strMod})</li>
                    <li>Dexterity: {this.props.monsterInfo.mDex} ({dexMod})</li>
                    <li>Constitution: {this.props.monsterInfo.mCon} ({conMod})</li>
                    <li>Inteligence: {this.props.monsterInfo.mInt} ({intMod})</li>
                    <li>Wisdom: {this.props.monsterInfo.mWis} ({wisMod})</li>
                    <li>Charisma: {this.props.monsterInfo.mCha} ({chaMod})</li>
                </ul>
            </div>
        )
    }
}

export default BaseMonsterStats;