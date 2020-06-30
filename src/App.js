import React, { Component } from 'react';
import './App.css'
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'

class App extends Component {
  state = {
    monsterName: 'Morteh',
    monsterType: 'God',
    armorClass: 0,
    hitPoints: 0,
    speed: 0,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    inteligence: 10,
    wisdom: 10,
    charisma: 10
  }

  render() {

    return (

      <main className='App'>
  
        <BaseMonsterStats />

        <MonsterCard monsterInfo={this.state}/>

      </main>
    )
  }
}


export default App;