import React from 'react'
import {composeWithTracker} from 'react-komposer'
import RosterLayout from '../components/RosterLayout.jsx'
import Loading from '../components/Loading'
const getRosterInformation = (sessionID) => {
  return new Promise((resolve, reject)=> {
    Meteor.call("getRosterInformation", {sessionID: sessionID}, (e, d) => {
      if (e){
        reject(e)
      }else {
        resolve(d)
      }
    })
  })
}

const _day = new ReactiveVar(new Date)
let _direction = ''
let timesheets = null


const navigateLeft = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  let date = _day.get()
  date.setDate(date.getDate() - 1)
  _day.set(date)
  _direction = "left"

  return false;
}

const navigateRight = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  let date = _day.get()
  date.setDate(date.getDate() + 1)
  _day.set(date)
  _direction = "right"
  return false;
}

const composer = (props, onData) => {
  let day = _day.get()
  if (timesheets == null) {
    getRosterInformation(props.sessionID)
      .then((d) => {
        timesheets = d.content.timecards
        onData(null, {timesheets: d.content.timecards, navigateLeft, navigateRight,day: day, direction: _direction})
      })
    // .catch((e) => {
    //  alert(`Error fetching roster info : ${e.reason}`)
    // })
  } else{
    onData(null, {day: day, t: day.getTime(), timesheets: timesheets, navigateLeft, navigateRight, direction: _direction})
  }

}

export default composeWithTracker(composer, Loading)(RosterLayout)






