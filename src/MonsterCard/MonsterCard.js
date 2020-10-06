import React, { Component } from 'react';
import ActionList from '../ActionList/actionList'
import './MonsterCard.css'

class MonsterCard extends Component {
        saveMonsterCard = e => {
            e.preventDefault();
            this.props.saveMonsterFunction(this.props.monsterInfo);
        };


        render() {
            const strMod = Math.floor(parseInt((this.props.monsterInfo.mStr)-10)/2);
            const dexMod = Math.floor(parseInt((this.props.monsterInfo.mDex)-10)/2);
            const conMod = Math.floor(parseInt((this.props.monsterInfo.mCon)-10)/2);
            const intMod = Math.floor(parseInt((this.props.monsterInfo.mInt)-10)/2);
            const wisMod = Math.floor(parseInt((this.props.monsterInfo.mWis)-10)/2);
            const chaMod = Math.floor(parseInt((this.props.monsterInfo.mCha)-10)/2);

        return (
            <div className="monsterCard" id="monsterCard">

                    <div className="monsterIdentitycontainer">
                        <div className="listItemContainer" id="mNameOut">
                                <p>{this.props.monsterInfo.mName}</p>
                        </div>

                        <div className="listItemContainer" id="mTypeOut">
                            <span>Type</span><p>{this.props.monsterInfo.mType}</p>
                        </div>

                        <div className="listItemContainer" id="cRating">
                            <span>Combat Rating</span><p>{this.props.monsterInfo.mCr}</p>
                        </div>

                    </div>
                    
                    <div className='coreMonsterStatsContainer'>
                        <div className="listItemContainer" id="proficienyOut">
                            <span>Proficiency</span><p>{this.props.monsterInfo.mProf}</p>
                        </div>

                        <div className="listItemContainer" id="aBonusOut">
                            <span>Attack Bonus</span><p>{this.props.monsterInfo.mAtk}</p>
                        </div>

                        <div className="listItemContainer" id="sCheckOut">
                            <span>Save Check</span><p>{this.props.monsterInfo.mSaveDc}</p>
                        </div>

                        <div className="listItemContainer" id="aClassOut">
                            <span>Armor Class</span><p>{this.props.monsterInfo.mArmor}</p>
                        </div>

                        <div className="listItemContainer" id="hPointsOut">
                            <span>Hit Points</span><p>{this.props.monsterInfo.mHp}</p>
                        </div>

                        <div className="listItemContainer" id="speedOut">
                            <span>Speed</span><p>{this.props.monsterInfo.mSpeed}</p>
                        </div>
                        
                    </div>
                    
                    <div className="abilityScoreContainer">

                        <div className="listItemContainer" id="aScoreOut">
                            <span>STR</span>

                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mStr} ({strMod})</p>
                            </div>
                            
                        </div>

                        <div className="listItemContainer" id="aScoreOut">
                            <span>DEX</span>
                            
                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mDex} ({dexMod})</p>
                            </div>
                            
                        </div>
                            
                        <div className="listItemContainer" id="aScoreOut">
                            <span>Con</span>
                            
                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mCon} ({conMod})</p>
                            </div>
                            
                        </div>
                            
                        <div className="listItemContainer" id="aScoreOut">
                            <span>INT</span>
                            
                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mInt} ({intMod})</p>
                            </div>
                            
                        </div>
                        
                        <div className="listItemContainer" id="aScoreOut">
                            <span>WIS</span>
                            
                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mWis} ({wisMod})</p>
                            </div>
                            
                        </div>

                        <div className="listItemContainer" id="aScoreOut">
                            <span>CHA</span>
                            
                            <div className="statsContainer">
                                <p>{this.props.monsterInfo.mCha} ({chaMod})</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div className="extraInfoContainer">

                        <div className="listItemContainer" id="vulnOut">
                            <span>Vulnerabilities</span><p>{this.props.monsterInfo.mVul}</p>
                        </div>

                        <div className="listItemContainer" id="resOut">
                            <span>Resistances</span><p>{this.props.monsterInfo.mRes}</p>
                        </div>

                        <div className="listItemContainer" id="immuneOut">
                            <span>Immunities</span><p>{this.props.monsterInfo.mImmune}</p>
                        </div>

                        <div className="listItemContainer" id="senseOut">
                            <span>Senses</span><p>{this.props.monsterInfo.mSenses}</p>
                        </div>

                        <div className="listItemContainer" id="langOut">
                            <span>Languages</span><p>{this.props.monsterInfo.mLanguage}</p>
                        </div>

                        <div className="listItemContainer" id="notesOut">
                            <span>Notes</span><p>{this.props.monsterInfo.mEnotes}</p>
                        </div>

                    </div>
                   
                <ActionList 
                    monsterInfo={this.props.monsterInfo} 
                    monsterMoves={this.props.monsterMoves}
                    deleteMonsterAttack={this.props.deleteMonsterAttack}
                />

                <div className="saveMonsterButtonContainer">
                    <button className='saveMonsterButton' id='saveMonster' onClick={this.saveMonsterCard}>Save Monster</button>
                </div>
                
            </div>
        )
    };
}

export default MonsterCard;