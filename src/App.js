import React, { Component } from 'react';
import './App.css'
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'
import CombatRatingSuggestion from './CombatRatingSuggestion/combatRatingSuggestion'
import LoadingMonsters from './LoadingMonsters/LoadingMonsters'
import config from './config';
//import movesRouter from '../../dnd-monster-creator-server/monsterMoves/monsterMoves-router';
//import DndContext from './DndContenxt';
var temp = 0;

class App extends Component {
  state = {
    monsterStats: {
      user_id: 1,
      monster_id: 0,
      mName: '',
      mType: '',
      mCr: '0',
      mAtk: 0,
      mSaveDc: 0,
      mProf: 0,
      mArmor: 10,
      mHp: 0,
      mSpeed: 0,
      mStr: 10,
      mStrSave: false,
      mDex: 10,
      mDexSave: false,
      mCon: 10,
      mConSave: false,
      mInt: 10,
      mIntSave: false,
      mWis: 10,
      mWisSave: false,
      mCha: 10,
      mChaSave: false,
      mVul: '',
      mRes: '',
      mImmune: '',
      mSenses: '',
      mLanguage: '',
      mEnotes: ''
    },
    startingPoint: [],
    monsters: [],
    monsterMoves: []
  }


  //  Grabs info from api endpoint
  //Grab only info relivant for the user. Depending on size (less than 200 kb)
  //Either pull all of it at the start for less requests, or if larger
  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/api/monsterStartingPoint`),
        fetch(`${config.API_ENDPOINT}/api/monsters/userId/${this.state.monsterStats.user_id}`)/*,
        fetch(`${config.API_ENDPOINT}/api/monsterMoves`)*/
    ])
        .then(([suggestionRes, monsterRes/*, movesRes*/]) => {
          if(!suggestionRes.ok) 
            return suggestionRes.json().then(e => Promise.reject(e));
          if(!monsterRes.ok)
            return monsterRes.json().then(e => Promise.reject(e));
          /*if(!movesRes.ok)
            return movesRes.json().then(e => Promise.reject(e));*/
          return Promise.all([suggestionRes.json(), monsterRes.json()/*, movesRes.json()*/])
        })

        .then(([startingPoint, monsters/*, monsterMoves*/]) => {
          this.setState({startingPoint, monsters/*, monsterMoves*/});
        })

        .catch(error => {
          console.error({error})
        })
  }
  //  Updates the state of all the values sent up from baseMonsterStats
  updateMonsterStats = monsterValues => {
      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mName: monsterValues.mName
      }}))

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mCr: monsterValues.mCr
      }}))

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mProf: monsterValues.mProf
      }}))

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mAtk: monsterValues.mAtk
      }}))

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mSaveDc: monsterValues.mSaveDc
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mType: monsterValues.mType
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mArmor: monsterValues.mArmor
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mHp: monsterValues.mHp
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mSpeed: monsterValues.mSpeed
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mStr: monsterValues.mStr
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mDex: monsterValues.mDex
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mCon: monsterValues.mCon
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mInt: monsterValues.mInt
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mWis: monsterValues.mWis
      }}))
      
      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mCha: monsterValues.mCha
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mVuln: monsterValues.mVuln
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mRes: monsterValues.mRes
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mImmune: monsterValues.mImmune
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mSenses: monsterValues.mSenses
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mLanguage: monsterValues.mLanguage
      }}))

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          mEnotes: monsterValues.mEnotes
      }}))
  }

  //  used input from the combat rating suggestions
  //sets average hit points and average AC and save them in the state
  updateMonsterStartingPoint = monsterStartingPoint => {
    console.log('updateMonsterStartingPoint called')

    let averageAc = monsterStartingPoint.armorClassStartingPoint;
    let averageHitpoints = Math.floor((monsterStartingPoint.hitPointsMin+monsterStartingPoint.hitPointsMax)/2);
    let combatRating = monsterStartingPoint.combatRating;
    let proficiencyBonus = monsterStartingPoint.proficiencyBonus;
    let attackBonus = monsterStartingPoint.attackBonus;
    let saveDc = monsterStartingPoint.saveDc;

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mProf: proficiencyBonus
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mAtk: attackBonus
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSaveDc: saveDc
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCr: combatRating
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mArmor: averageAc
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mHp: averageHitpoints
    }}))

  }

  //  Uses the state to save the monster info
  saveMonster = monsterInfo => {
    let user_id = monsterInfo.user_id;
    let monster_name = monsterInfo.mName;
    let monster_type = monsterInfo.mType;
    let challenge_rating = monsterInfo.mCr;
    let proficiencybonus = monsterInfo.mProf;
    let armorclass = monsterInfo.mArmor;
    let hitpoints = monsterInfo.mHp;
    let attackbonus = monsterInfo.mAtk;
    let speed = monsterInfo.mSpeed;
    let savedc = monsterInfo.mSaveDc;
    let strength = monsterInfo.mStr;
    let strengthsave = monsterInfo.mStrSave;
    let dexterity = monsterInfo.mDex;
    let dexteritysave = monsterInfo.mDexSave;
    let constitution = monsterInfo.mCon;
    let constitutionsave = monsterInfo.mConSave
    let inteligence = monsterInfo.mInt;
    let	inteligencesave = monsterInfo.mIntSave;
    let	wisdom = monsterInfo.mWis;
    let	wisdomsave = monsterInfo.mWisSave;
    let	charisma = monsterInfo.mCha;
    let	charismasave = monsterInfo.mChaSave;
    let	damagevulnerability = monsterInfo.mVuln;
    let	damageresistances = monsterInfo.mRes;
    let	damageimmunities = monsterInfo.mImmune;
    let	senses = monsterInfo.mSenses;
    let	creature_language	= monsterInfo.mLanguage;
    let notes = monsterInfo.mEnotes;
    
    const newMonster = {
      user_id: user_id,
      monster_name: monster_name,
      monster_type: monster_type,
      challenge_rating: challenge_rating,
      proficiencybonus: proficiencybonus,
      armorclass: armorclass,
      hitpoints: hitpoints,
      attackbonus: attackbonus,
      speed: speed,
      savedc: savedc,
      strength: strength,
      strengthsave: strengthsave,
      dexterity: dexterity,
      dexteritysave: dexteritysave,
      constitution: constitution,
      constitutionsave: constitutionsave,
      inteligence: inteligence,
      inteligencesave: inteligencesave,
      wisdom: wisdom,
      wisdomsave: wisdomsave,
      charisma: charisma,
      charismasave: charismasave,
      damagevulnerability: damagevulnerability,
      damageresistances: damageresistances,
      damageimmunities: damageimmunities,
      senses: senses,
      creature_language: creature_language,
      notes: notes
    }
    
    fetch(`${config.API_ENDPOINT}/api/monsters`, {
      method: 'POST',
      body: JSON.stringify(newMonster),
      headers: {
        'content-type': 'application/json'
      }
    })
    
    
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json();
    })

    .then(data => {

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          monster_id: data.id
      }}))      
    })

    .then(() => {
      const monsterMoves = this.state.monsterMoves;
      
      this.saveMoves(monsterMoves)
    })

    .catch(error => {
      console.error({error})
    })
  }

  saveMoves = monsterMoves => {
    
    monsterMoves.forEach((info) => {
      info['monster_id'] = this.state.monsterStats.monster_id;
      fetch(`${config.API_ENDPOINT}/api/monsterMoves`, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'content-type': 'application/json'
        }
      })

      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json();
      })

      .catch(error => {
        console.error({error})
      })
    })
  }

  loadSavedMonsterStats = savedMonsterStats => {
    console.log(savedMonsterStats)
    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        monster_id: savedMonsterStats.id
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mName: savedMonsterStats.monster_name
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mType: savedMonsterStats.monster_type
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCr: savedMonsterStats.challenge_rating
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mAtk: savedMonsterStats.attackbonus
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSaveDc: savedMonsterStats.saveDc
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mProf: savedMonsterStats.proficiencybonus
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mArmor: savedMonsterStats.armorclass
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mHp: savedMonsterStats.hitpoints
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSpeed: savedMonsterStats.speed
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mStr: savedMonsterStats.strength
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mStrSave: savedMonsterStats.strengthsave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mDex: savedMonsterStats.dexterity
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mDexSave: savedMonsterStats.dexteritysave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCon: savedMonsterStats.constitution
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mConSave: savedMonsterStats.constitutionsave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mInt: savedMonsterStats.inteligence
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mIntSave: savedMonsterStats.inteligencesave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mWis: savedMonsterStats.wisdom
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mWisSave: savedMonsterStats.wisdomsave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCha: savedMonsterStats.charisma
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mChaSave: savedMonsterStats.charismasave
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mVul: savedMonsterStats.vulnerability
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mRes: savedMonsterStats.resistance
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mImmune: savedMonsterStats.immunities
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSenses: savedMonsterStats.senses
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mLanguage: savedMonsterStats.language
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mEnotes: savedMonsterStats.notes
    }}))
  }

  addMonsterAttack = full_action => {
    this.setState({ monsterMoves: [...this.state.monsterMoves, full_action]});

  }

  render() {

    return (
        <main className='App'>

          <CombatRatingSuggestion updateMonsterStartingPoint={this.updateMonsterStartingPoint} startingValues={this.state.startingPoint}/>

          <LoadingMonsters userId={this.state.monsterStats.user_id} loadSavedMonsterStats={this.loadSavedMonsterStats}/>
          
          <BaseMonsterStats updateMonsterStats={this.updateMonsterStats} addMonsterAttack={this.addMonsterAttack}/>

          <MonsterCard monsterInfo={this.state.monsterStats} saveMonsterFunction={this.saveMonster} monsterMoves={this.state.monsterMoves}/>

        </main>
      //</DndContext.Provider>
      
    )
  }
}


export default App;