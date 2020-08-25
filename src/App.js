import React, { Component } from 'react';
import './App.css'
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'
import CombatRatingSuggestion from './CombatRatingSuggestion/combatRatingSuggestion'
import LoadingMonsters from './LoadingMonsters/LoadingMonsters'
import LoginBar from './loginBar/loginBar'
import { v4 as uuidv4 } from 'uuid';
import config from './config';
//import movesRouter from '../../dnd-monster-creator-server/monsterMoves/monsterMoves-router';
//import DndContext from './DndContenxt';
var temp = 0;

class App extends Component {
  state = {
    monsterStats: {
      user_id: 1,
      monster_id: 0,
      mName: 'Test Name',
      mType: 'Test id',
      mCr: '0',
      mAtk: 0,
      mSaveDc: 0,
      mProf: 0,
      mArmor: 10,
      mHp: 0,
      mSpeed: 0,
      mStr: 10,
      mDex: 10,
      mCon: 10,
      mInt: 10,
      mWis: 10,
      mCha: 10,
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

  //  creates a new user in the database and returns the id
  newUserCreation = username => {
    let newUserInfo = {id: uuidv4(), username: username}
    
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      body: JSON.stringify(newUserInfo),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      /*console.log('First then is called in patch request in app.ks')*/
      console.log(res)
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      
      return res.json()
    })

    .then(data => {
      window.alert(`Please save this value for login 
      
      ${data.id}`)
    })

    .catch(error => {
      console.error({error})
    })
  }

  userLogin = userLoginInfo => {
    let loginId = userLoginInfo.id
    let loginUsername = userLoginInfo.username

    fetch(`${config.API_ENDPOINT}/api/users/${loginId}/${loginUsername}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      
      return res.json()
    })

    .then(data => {
      if(data.length === 0) {
        window.alert('Your login crudentials were wrong');
      } else {
        window.alert(`You have logged into ${data[0].username}`)

        this.setState(prevState => ({
          monsterStats: {
            ...prevState.monsterStats,
            user_id: data[0].id
        }}))

        let loggedInUserId = data[0].id
        this.loadMonsterList(loggedInUserId)
      }
    })

    .catch(error => {
      console.error({error})
    })
  }

  loadMonsterList = userId => {
    
    fetch(`${config.API_ENDPOINT}/api/monsters/userId/${userId}`, {
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      return res.json()
    })

    .then(monsters => {
      console.log(monsters)
      this.setState({monsters})
    })
  }

  //  Updates the state of all the values sent up from baseMonsterStats
  updateMonsterStats = monsterValues => {
    if(this.state.monsterStats.monster_id === 0) {
      let uniqueMonsterId = uuidv4();

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          monster_id: uniqueMonsterId
      }}))
    }
    
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

  //  Uses the state to update the monster info
  //if an error returns saying the monster already exists it creates the monster
  //running saveNewMonster function
  saveMonster = monsterInfo => {
    let user_id = monsterInfo.user_id;
    let monster_id = monsterInfo.monster_id;
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
    let dexterity = monsterInfo.mDex;
    let constitution = monsterInfo.mCon;
    let inteligence = monsterInfo.mInt;
    let	wisdom = monsterInfo.mWis;
    let	charisma = monsterInfo.mCha;
    let	damagevulnerability = monsterInfo.mVuln;
    let	damageresistances = monsterInfo.mRes;
    let	damageimmunities = monsterInfo.mImmune;
    let	senses = monsterInfo.mSenses;
    let	creature_language	= monsterInfo.mLanguage;
    let notes = monsterInfo.mEnotes;
    
    const newMonster = {
      user_id: user_id,
      id: monster_id,
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
      dexterity: dexterity,
      constitution: constitution,
      inteligence: inteligence,
      wisdom: wisdom,
      charisma: charisma,
      damagevulnerability: damagevulnerability,
      damageresistances: damageresistances,
      damageimmunities: damageimmunities,
      senses: senses,
      creature_language: creature_language,
      notes: notes
    }
    
    fetch(`${config.API_ENDPOINT}/api/monsters/monsterId/${monster_id}`, {
      method: 'PATCH',
      body: JSON.stringify(newMonster),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      /*console.log('First then is called in patch request in app.ks')*/
      console.log(res)
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      const monsterMoves = this.state.monsterMoves;

      this.saveMoves(monsterMoves)
      
      return res.json()
    })

    .catch(error => {
      console.error({error})
    })
  }

  //  Grabs monster id then uses theid as part of the move post request
  //along with the other info from the form
  saveMoves = monsterMoves => {
    console.log('monsterMoves is called')
    monsterMoves.forEach((info) => {
      info['monster_id'] = this.state.monsterStats.monster_id;

      fetch(`${config.API_ENDPOINT}/api/monsterMoves/${info.monster_id}`, {
        method: 'PATCH',
        body: JSON.stringify(info),
        headers: {
          'content-type': 'application/json'
        }
      })

      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        console.log(res.json())
        return res.json();
      })

      .catch(error => {
        console.error({error})
      })
    })
  }

  loadSavedMonsters = savedMonsters => {
    this.setState({monster: savedMonsters})
  }

  loadSavedMonsterStats = savedMonsterStats => {
    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        monster_id: parseInt(savedMonsterStats.id)
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
        mAtk: parseInt(savedMonsterStats.attackbonus)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSaveDc: parseInt(savedMonsterStats.saveDc)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mProf: parseInt(savedMonsterStats.proficiencybonus)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mArmor: parseInt(savedMonsterStats.armorclass)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mHp: parseInt(savedMonsterStats.hitpoints)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSpeed: savedMonsterStats.speed
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mStr: parseInt(savedMonsterStats.strength)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mDex: parseInt(savedMonsterStats.dexterity)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCon: parseInt(savedMonsterStats.constitution)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mInt: parseInt(savedMonsterStats.inteligence)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mWis: parseInt(savedMonsterStats.wisdom)
    }}))

    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCha: parseInt(savedMonsterStats.charisma)
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
    
    this.loadSavedMonsterMoves(savedMonsterStats)
  }

  loadSavedMonsterMoves = savedMonsterStats => {
    const selectedMonsterId = savedMonsterStats.id;
    
    fetch(`${config.API_ENDPOINT}/api/monsterMoves/specificMonster/${selectedMonsterId}`)
    
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      
      return res.json()
    })

    .then(data => {
      this.setState({monsterMoves: data})
    })
  }

  addMonsterAttack = full_action => {
    this.setState({ monsterMoves: [...this.state.monsterMoves, full_action]});

  }

  deleteMonster = monsterId => {
    const toBeDeletedId = parseInt(monsterId);
    const monsterList = this.state.monsters;
    
    monsterList.forEach((monster, i) => {
      
      if(monster.id === toBeDeletedId) {
        fetch(`${config.API_ENDPOINT}/api/monsters/monsterId/${toBeDeletedId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })

        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          
          let newMonsterList = this.state.monsters;
          newMonsterList.splice(i,1);
          this.setState({monsters: newMonsterList})
          return res.json
        })

        .catch(error =>
          console.error({error}))
      }
    })
  }

  deleteMonsterAttack = monsterAttack_Id => {
    const selectedMoveId = monsterAttack_Id;
    const monsterMoveList = this.state.monsterMoves
    monsterMoveList.forEach((move, i) => {
      if(move.id === selectedMoveId) {
        fetch(`${config.API_ENDPOINT}/api/monsterMoves/${selectedMoveId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })

        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))

          let newMoveList = this.state.monsterMoves;
          newMoveList.splice(i,1)
          this.setState({monsterMoves: newMoveList})
          return res.json
        })

        .catch(error => {
          console.error({error})
        })
      }
    })
  }

  render() {

    return (
        <main className='App'>
          <LoginBar newUserCreation={this.newUserCreation}
          userLogin={this.userLogin}
          />

          <CombatRatingSuggestion
            updateMonsterStartingPoint={this.updateMonsterStartingPoint}
            startingValues={this.state.startingPoint}
          />

          <LoadingMonsters
            userId={this.state.monsterStats.user_id} 
            loadSavedMonsters={this.loadSavedMonsters}
            monsters={this.state.monsters}
            loadSavedMonsterStats={this.loadSavedMonsterStats}
            deleteMonster={this.deleteMonster}
          />
          
          <BaseMonsterStats 
            updateMonsterStats={this.updateMonsterStats} 
            addMonsterAttack={this.addMonsterAttack}
          />

          <MonsterCard 
            monsterInfo={this.state.monsterStats}
            saveMonsterFunction={this.saveMonster}
            monsterMoves={this.state.monsterMoves}
            deleteMonsterAttack={this.deleteMonsterAttack}
          />

        </main>
      //</DndContext.Provider>
      
    )
  }
}


export default App;