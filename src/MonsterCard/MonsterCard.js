import React, { Component } from 'react';
import ActionList from '../ActionList/actionList'
import './MonsterCard.css'

class MonsterCard extends Component {
        saveMonsterCard = e => {
            e.preventDefault()
            this.props.saveMonsterFunction(this.props.monsterInfo)
        }


        render() {
        const strMod = Math.floor(parseInt((this.props.monsterInfo.mStr)-10)/2)
        const dexMod = Math.floor(parseInt((this.props.monsterInfo.mDex)-10)/2)
        const conMod = Math.floor(parseInt((this.props.monsterInfo.mCon)-10)/2)
        const intMod = Math.floor(parseInt((this.props.monsterInfo.mInt)-10)/2)
        const wisMod = Math.floor(parseInt((this.props.monsterInfo.mWis)-10)/2)
        const chaMod = Math.floor(parseInt((this.props.monsterInfo.mCha)-10)/2)

        return (
            <div className = 'monsterCard'>
                <ul>
                    <li>Monster Name: {this.props.monsterInfo.mName}</li>
                    <li>Monster Type: {this.props.monsterInfo.mType}</li>
                    <li>Combat Rating: {this.props.monsterInfo.mCr}</li>
                    <li>Proficiency: {this.props.monsterInfo.mProf}</li>
                    <li>Attack Bonus: {this.props.monsterInfo.mAtk}</li>
                    <li>Save Check: {this.props.monsterInfo.mSaveDc}</li>
                    <li>Armor Class: {this.props.monsterInfo.mArmor}</li>
                    <li>Hit Points: {this.props.monsterInfo.mHp}</li>
                    <li>Speed: {this.props.monsterInfo.mSpeed}</li>
                    <li>Strength: {this.props.monsterInfo.mStr} ({strMod})</li>
                    <li>Dexterity: {this.props.monsterInfo.mDex} ({dexMod})</li>
                    <li>Constitution: {this.props.monsterInfo.mCon} ({conMod})</li>
                    <li>Inteligence: {this.props.monsterInfo.mInt} ({intMod})</li>
                    <li>Wisdom: {this.props.monsterInfo.mWis} ({wisMod})</li>
                    <li>Charisma: {this.props.monsterInfo.mCha} ({chaMod})</li>
                    <li>Vulnerabilities: {this.props.monsterInfo.mVul}</li>
                    <li>Resistances: {this.props.monsterInfo.mRes}</li>
                    <li>Immunities: {this.props.monsterInfo.mImmune}</li>
                    <li>Senses: {this.props.monsterInfo.mSenses}</li>
                    <li>Languages: {this.props.monsterInfo.mLanguage}</li>
                    <li>Notes: {this.props.monsterInfo.mEnotes}</li>
                </ul>
                <ActionList 
                    monsterInfo={this.props.monsterInfo} 
                    monsterMoves={this.props.monsterMoves}
                    deleteMonsterAttack={this.props.deleteMonsterAttack}
                />
                <button name='saveMonster' id='saveMonster' onClick={this.saveMonsterCard}>Save Monster</button>
            </div>
        )
    }
}

export default MonsterCard;