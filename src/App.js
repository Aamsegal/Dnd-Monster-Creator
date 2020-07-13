import React, { Component } from 'react';
import './App.css'
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'
import CombatRatingSuggestion from './CombatRatingSuggestion/combatRatingSuggestion'
import config from './config';
//import DndContext from './DndContenxt';

class App extends Component {
  state = {
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
    mCha: 10,
    startingPoint: []   
  }

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/api/monsterStartingPoint`)
    ])
        .then(([suggestionRes]) => {
          if(!suggestionRes.ok)
              
            return suggestionRes.json().then(e => Promise.reject(e));
          return Promise.all([suggestionRes.json()])
        })

        .then(([startingPointStats]) => {
          console.log(startingPointStats)
          this.setState({ 
            startingPoint: startingPointStats
           });
        })

        .catch(error => {
          console.error({error})
        })

        //console.log(this.state.startingPoint)
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
    let averageHitpoints = (monsterStartingPoint.hitPointsMin+monsterStartingPoint.hitPointsMax)/2;
    this.setState({mArmor: averageAc})
    this.setState({mHp: averageHitpoints})

  }

  render() {

    return (
      //<a href="<GENERATED_GOOGLE_URL>">Login with Google</a>
      //<DndContext.Provider value={value}>
        <main className='App'>

          <CombatRatingSuggestion updateMonsterStartingPoint={this.updateMonsterStartingPoint} startingValues={this.state.startingPoint}/>

          <BaseMonsterStats updateMonsterStats={this.updateMonsterStats}/>

          <MonsterCard monsterInfo={this.state} />

        </main>
      //</DndContext.Provider>
      
    )
  }
}


export default App;