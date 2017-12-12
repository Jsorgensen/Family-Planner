import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Calendar from './components/Calendar'
import Chores from './components/Chores'
import Contacts from './components/Contacts'
import Dashboard from './components/Dashboard'
import FamilyMember from './components/FamilyMember'
import Groceries from './components/Groceries'
import Locator from './components/Locator'
import Messenger from './components/Messenger'
import Recipes from './components/Recipes'

class App extends Component{
  render(){
    return(
      <Switch>
        <Route path='/Calendar/:id' component={Calendar}/>
        <Route path='' component={Chores}/>
        <Route path='' component={Contacts}/>
        <Route exact default path='/' component={Dashboard}/>
        <Route path='' component={FamilyMember}/>
        <Route path='' component={Groceries}/>
        <Route path='' component={Locator}/>
        <Route path='' component={Messenger}/>
        <Route path='' component={Recipes}/>
      </Switch>
    )
  }
}