import React, { Component } from 'react';
import BaseMonsterStats from './BaseMonsterStats/baseMonsterStats'
import MonsterCard from './MonsterCard/MonsterCard'
import CombatRatingSuggestion from './CombatRatingSuggestion/combatRatingSuggestion'
import LoadingMonsters from './LoadingMonsters/LoadingMonsters'
import LoginBar from './loginBar/loginBar'
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import Cookies from 'universal-cookie';
import './App.css';

const cookies = new Cookies();

class App extends Component {

  state = {
    monsterStats: {
      user_id: 0,
      monster_id: 0,
      mName: '',
      mType: '',
      mCr: 0,
      mAtk: 0,
      mSaveDc: 0,
      mProf: 0,
      mArmor: 10,
      mHp: 0,
      mSpeed: '',
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
      mEnotes: '',
      currentUserName: ''
    },
    startingPoint: [],
    monsters: [],
    monsterMoves: []
  }  


  //  Grabs info from api endpoint
  //Grab only info relivant for the user. Depending on size (less than 200 kb)
  //Either pull all of it at the start for less requests, or if larger
  componentDidMount() {
    
    let cookiedUser = (cookies.get('user_id'));
    let cookiedUsername = (cookies.get('username'));    

    //  Checks if there there is a cookie fo the user then sets the state to that.
    //it sets cookies user to 0 so no info will br grabbed
    if(typeof cookiedUser !== 'undefined') {

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          user_id: cookiedUser
      }}))

      this.setState(prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          currentUserName: cookiedUsername
      }}))
    } else {

      cookiedUser = 0;

    }
    
    
    Promise.all([
        //  Makes two api calls to monsterStartingPoint to get suggested stats and
        //the monsters page to check if the current user (if there is one) has any saved monsters and grabs them
        fetch(`${config.API_ENDPOINT}/api/monsterStartingPoint`),
        fetch(`${config.API_ENDPOINT}/api/monsters/userId/${cookiedUser}`)
        
    ])
        .then(([suggestionRes, monsterRes]) => {
          if(!suggestionRes.ok) 
            return suggestionRes.json().then(e => Promise.reject(e));
          if(!monsterRes.ok)
            return monsterRes.json().then(e => Promise.reject(e));
          return Promise.all([suggestionRes.json(), monsterRes.json()])
        })

        .then(([startingPoint, monsters/*, monsterMoves*/]) => {
          this.setState({startingPoint, monsters/*, monsterMoves*/});
        })

        .catch(error => {

        })
  }

  //  creates a new user in the database and returns the id
  newUserCreation = (username, password) => {
    let newUserInfo = {username: username, userpass: password}
    
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      body: JSON.stringify(newUserInfo),
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
      window.alert(`You have succesfully created an account. Enjoy!`)
      
    })

    .catch(error => {

    })
  }

  //  Logs in the user and sets the cookie for 5 days
  userLogin = userLoginInfo => {
    let loginUsername = userLoginInfo.username
    let loginUserpass = userLoginInfo.password

    fetch(`${config.API_ENDPOINT}/api/users/${loginUsername}/${loginUserpass}`, {
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
        window.alert('There is no user with that username and password. Try again.');
      } else {
        window.alert(`You have logged into ${data[0].username}`)     

        this.setState(prevState => ({
          monsterStats: {
            ...prevState.monsterStats,
            user_id: data[0].id
        }}))

        this.setState(prevState => ({
          monsterStats: {
            ...prevState.monsterStats,
            currentUserName: data[0].username
        }}))
        
        const fiveDays = 60*60*24*5
        
        cookies.set('user_id', data[0].id, {secure: true, maxAge: fiveDays});
        cookies.set('username', data[0].username, {secure: true, maxAge: fiveDays});
        
        
        let loggedInUserId = data[0].id
        this.loadMonsterList(loggedInUserId)
      }
    })

    .catch(error => {

    })
  }

  // Does the same thing as the api call above, checks if the user has any monster saved
  //and grabs them. This happens when the user saves a monster
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
      this.setState({monsters})
    })
  }

  //  sets the state = to the base monster. Mainly resetting the monster id so when the user saves
  //their monster it will do a post request instead of a patch
  createNewMonster = () => {
    
    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        monster_id: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mName: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mType: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCr: '0'
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mAtk: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSaveDc: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mProf: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mArmor: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mHp: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSpeed: 0
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mStr: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mDex: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCon: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mInt: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mWis: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mCha: 10
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mVul: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mRes: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mImmune: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mSenses: ''
    }}))
    
    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mLanguage: ''
    }}))

    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        mEnotes: ''
    }}))
  }

  // Searched for whatever stat was changed and then saved the state with the new info
  updateMonsterStats = (key, value) => {
    this.setState( prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        [key]: value
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

  // Sets the monster Id in the state to 0 and clears all the stats so when the user hits save
  //the api saves a new monster
  newMonsterId = () => {
    let currentId = this.state.monsterStats.monster_id;

    if (currentId === 0) {
      currentId = uuidv4();

      this.setState( prevState => ({
        monsterStats: {
          ...prevState.monsterStats,
          monster_id: currentId
      }}))
      
    }

    return currentId;

  }
  //  Uses the state to update the monster info
  //if an error returns saying the monster already exists it creates the monster
  //running saveNewMonster function
  saveMonster = monsterInfo => {
    let user_id = monsterInfo.user_id;
    let monster_id = this.newMonsterId();
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
    
    if(user_id === 0) {
      window.alert('You need to be logged in to save a monster.')
      return
    }

    const requiredInfo = {
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
    }

    const nonRequiredInfo = {
      damagevulnerability: damagevulnerability,
      damageresistances: damageresistances,
      damageimmunities: damageimmunities,
      senses: senses,
      creature_language: creature_language,
      notes: notes
    }

    this.inputValidation(requiredInfo);

    const newMonster = {
      ...requiredInfo,
      ...nonRequiredInfo
    }
    
    fetch(`${config.API_ENDPOINT}/api/monsters/monsterId/${monster_id}`, {
      method: 'PATCH',
      body: JSON.stringify(newMonster),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      const monsterMoves = this.state.monsterMoves;

      this.saveMoves(monsterMoves)

      this.loadMonsterList(user_id)
      
      return res.json()
    })

    .then(data => {
    })

    .catch(error => {

    })
  }

  //  Grabs monster id then uses theid as part of the move post request
  //along with the other info from the form
  saveMoves = monsterMoves => {
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
        return res.json();
      })

      .catch(error => {

      })
    })
  }

  // Validates the inputs from the user
  inputValidation = object => {

    // This object is used to return user friendly names for the info as opposed to
    //the names the server uses like. hitpointsmHp vs Hit points
    const keyToName = {
      user_id: 'User Id',
      monster_id: 'Monster Id',
      monster_name: 'Monster Name',
      monster_type: 'Monster Type',
      challenge_rating: 'Combat Rating',
      attackbonus: 'Attack Bonus',
      savedc: 'Save Dc',
      proficiencybonus: 'Proficiency',
      armorclass: 'Armor Class',
      hitpointsmHp: 'Hit Points',
      speed: 'Movement Speed',
      strength: 'Strength Score',
      dexterity: 'Dexterity Score',
      constitution: 'Constitution Score',
      inteligence: 'Inteligence Score',
      wisdom: 'Wisdom Score',
      charisma: 'Charisma Score',
    }

    const invalidInputs = []

    Object.entries(object).forEach(([key, value]) => {
      if (value === 0 || value === '') {
        invalidInputs.push(key)
      }
    })      

    if (invalidInputs.length != 0) {
      let topInvalidKey = invalidInputs[0];
      let missingInput = keyToName[topInvalidKey];
      window.alert(`You are missing the "${missingInput}" field. Please fill it out before, and other you may be missing before you try again.`)
    }

  }

  // Loads the monsters from the api call sent to this function via loadingMonster component
  loadSavedMonsters = savedMonsters => {
    this.setState({monster: savedMonsters})
  }

  // Takes the values of the selected monster and changes the state to them
  loadSavedMonsterStats = savedMonsterStats => {
    this.setState(prevState => ({
      monsterStats: {
        ...prevState.monsterStats,
        monster_id: (savedMonsterStats.id)
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
        mSaveDc: parseInt(savedMonsterStats.savedc)
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

  // Does the same thing as the function above but for moves
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

  // Takes the input from the abilities function in BaseMonsterStats and adds them to the monster moves state
  addMonsterAttack = full_action => {
    this.setState({ monsterMoves: [...this.state.monsterMoves, full_action]});

  }

  // Makes an api call to delete the monster selected In LoadingMonsters then makes a call to get monster from the server
  //to reset the list
  deleteMonster = monsterId => {
    const toBeDeletedId = (monsterId); //Checks the id of the current monster selected
    const monsterList = this.state.monsters; //grabs the monster list
    
    monsterList.forEach((monster, i) => { //Iterates through monster list looking for any monster that has an ID = to toBeDeletedId
      
      if(monster.id === toBeDeletedId) { //If any matches are found it makes an api request to the server 
        fetch(`${config.API_ENDPOINT}/api/monsters/monsterId/${toBeDeletedId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })

        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          
          /*If the respons is ok, it will delete the monster from the list*/
          let newMonsterList = this.state.monsters;
          newMonsterList.splice(i,1);
          this.setState({monsters: newMonsterList});
          return res.json;
        })

        .catch(error => {

        })
          
      }

    })
  }

  // Checks the id of the selected monster in LoadingMonsters component then tries to delete it on the server.
  //If the deletion is successful on the server, it will then remove it localy from the state
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

        })
      }
    })
  }

  render() {

    return (
        <main className='App'>
          <LoginBar newUserCreation={this.newUserCreation}
          userLogin={this.userLogin}
          username = {this.state.monsterStats.currentUserName}
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
            createNewMonster={this.createNewMonster}
            deleteMonster={this.deleteMonster}
          />
          
          <div className = "monsterInfoContainer">
            <BaseMonsterStats 
            updateMonsterStats={this.updateMonsterStats}
            monsterStats={this.state.monsterStats}
            addMonsterAttack={this.addMonsterAttack}
            />

          <MonsterCard 
            monsterInfo={this.state.monsterStats}
            saveMonsterFunction={this.saveMonster}
            monsterMoves={this.state.monsterMoves}
            deleteMonsterAttack={this.deleteMonsterAttack}
            />
          </div>
          

        </main>
      //</DndContext.Provider>
      
    )
  }
}


export default App;