import React from 'react'
import {composeWithTracker} from 'react-komposer'
import MainLayout from '../components/MainLayout'
import localStorage from 'localStorage'
import Loading from '../components/Loading'

const loginDetails = {sessionID: localStorage.getItem("sessionId")}
const logginIn = new ReactiveVar(false)
const reactiveLoginDetails = new ReactiveVar(loginDetails)



const loginWithCredentials = (username, password) => {
  logginIn.set(true)
  Meteor.call("loginWithCredentials", {username: username, password: password}, (e, d) => {
    logginIn.set(false)
    if (e){
      reactiveLoginDetails.set({sessionID:null, error: true})
    } else {
      if (d.statusCode && d.statusCode === 200) {
        reactiveLoginDetails.set({sessionID: d.sessionID, loggedIn: true})
        localStorage.setItem("sessionId", d.sessionID)
      } else {
        reactiveLoginDetails.set({sessionID:null, error: true})
      }
    }
  })
}

const loginWithSession = (sessionID) => {
  logginIn.set(true)
  Meteor.call("loginWithSession", {sessionID: reactiveLoginDetails.get().sessionID}, (e, d) => {
    logginIn.set(false)
    if (e){
      reactiveLoginDetails.set({sessionID:null, error: true})
    }else {
      if (d.statusCode && d.statusCode === 200) {
        reactiveLoginDetails.set({sessionID: reactiveLoginDetails.get().sessionID, loggedIn: true})
      } else {
        logOut()
      }
    }
  })
}

const logOut = () => {
  reactiveLoginDetails.set({sessionID: null})
  localStorage.setItem("sessionId", null)
}

const composer = (props, onData) => {
  var loginState = reactiveLoginDetails.get()
  var logingInState = logginIn.get()
  if (loginState.loggedIn === true) {
    onData(null, {loggedIn: true, sessionID: loginState.sessionID, logOut})
  } else {
    if (loginState.sessionID == null) {
      onData(null, {loggedIn: false,logOut, logginIn: logingInState, error: loginState.error , loginWithCredentials})
    }else{
      loginWithSession(loginState.sessionID)
    }
  }
}

export default composeWithTracker(composer, Loading)(MainLayout)

