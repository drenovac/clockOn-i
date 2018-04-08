import React from 'react'
import {composeWithTracker} from 'react-komposer'
import Home from '../components/ManagerHome'
import RosterMeSession from '../../../../lib/client/session'

const loginDetails = {sessionID: localStorage.getItem("sessionId")}
const logginIn = new ReactiveVar(false)
const reactiveLoginDetails = RosterMeSession()
reactiveLoginDetails.set(loginDetails)

const loginWithSession = (sessionID) => {
  logginIn.set(true)
  Meteor.call("loginWithSession", {sessionID: reactiveLoginDetails.get().sessionID}, (e, d) => {
    logginIn.set(false)
    if (e) {
      reactiveLoginDetails.set({sessionID: null, error: true})
    } else {
      if (d.statusCode && d.statusCode === 200) {
        reactiveLoginDetails.set({sessionID: reactiveLoginDetails.get().sessionID, loggedIn: true, user: d.user})
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

const toggleSidebar = (sidebar) => {
  $(sidebar).toggle('slide')
}

const composition = (props, onData) => {
  var metaInfo = {name: "viewport", content: "user-scalable=no, width=device-width, maximum-scale=1, initial-scale=1, minimum-scale=1"};
  DocHead.addMeta(metaInfo);

  let loginState = reactiveLoginDetails.get()
  let logingInState = logginIn.get()
  Meteor.subscribe("Companies")



  if (loginState.loggedIn === true) {
    if (loginState.user.role !== 'site'){
     FlowRouter.go('/')
    }else {
      let company = Companies.findOne({code: loginState.user.company})
      if (company) {
        onData(null, {logOut,toggleSidebar, companyName: company.name, fullName: `${loginState.user.firstName}`})
      }else{
        onData(null, {logOut,toggleSidebar, companyName: loginState.user.company, fullName: `${loginState.user.firstName}`})
      }
    }
  } else {
    if (loginState.sessionID == null) {
      FlowRouter.go('/')
    } else {
      loginWithSession(loginState.sessionID)
    }
  }
}

export default composeWithTracker(composition)(Home)