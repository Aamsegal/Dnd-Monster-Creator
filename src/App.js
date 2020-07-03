import React, { Component } from 'react';
import './App.css'
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'
import CombatRatingSuggestion from './CombatRatingSuggestion/combatRatingSuggestion'

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        mName: '',
        mType: '',
        mArmor: 0,
        mHp: 0,
        mSpeed: 0,
        mStr: 10,
        mDex: 10,
        mCon: 10,
        mInt: 10,
        mWis: 10,
        mCha: 10
    }
  }

  updateMonsterStats = monsterValues => {
    
    /*let x
    for(x in monsterValues) {
      console.log(x)
      //const value = monsterValues.x
      
      
      this.setState({x: monsterValues.x})
      
    }*/
      this.setState({mName: monsterValues.mName})
      this.setState({mType: monsterValues.mType})
      this.setState({mArmor: monsterValues.mArmor})
      this.setState({mHp: monsterValues.mHp})
      this.setState({mSpeed: monsterValues.mSpeed})
      this.setState({mStr: monsterValues.mStr})
      this.setState({mDex: monsterValues.mDex})
      this.setState({mCon: monsterValues.mCon})
      this.setState({mInt: monsterValues.mInt})
      this.setState({mWis: monsterValues.mWis})
      this.setState({mCha: monsterValues.mCha})
    
  }

  updateMonsterStartingPoint = monsterStartingPoint => {

    let averageAc = monsterStartingPoint.armorClassStartingPoint;
    console.log(averageAc)
    let averageHitpoints = (monsterStartingPoint.hitPointsMin+monsterStartingPoint.hitPointsMax)/2;
    console.log(averageHitpoints)
    this.setState({mArmor: averageAc})
    this.setState({mHp: averageHitpoints})

  }

  render() {
    console.log('Render method call')
    console.log(this.state)

    //const monsterInfo = this.state;

    return (

      <main className='App'>
        <CombatRatingSuggestion updateMonsterStartingPoint={this.updateMonsterStartingPoint}/>
  
        <BaseMonsterStats updateMonsterStats={this.updateMonsterStats}/>

        <MonsterCard monsterInfo={this.state} />

      </main>
    )
  }
}


export default App;