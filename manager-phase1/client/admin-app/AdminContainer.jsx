import React from 'react'
import {composeWithTracker} from 'react-komposer'
import MainLayout from './accounts/MainLayout'

const loginError = new ReactiveVar(false)
const loginWithCredentials = (username, password) => {
  Meteor.loginWithPassword(username, password, (err, data) => {
    if (err){
      loginError.set(true)
    }else{
      loginError.set(false)
    }
  })
}

const compose = (props, onData) => {

  let user = Meteor.user()
  let error = loginError.get()

  onData(null, {user, loginWithCredentials, error})
}


export default composeWithTracker(compose)(MainLayout)

