import React from 'react'
import {composeWithTracker} from 'react-komposer'
import WeekLayout from '../components/WeekLayout'
import Loading from '../components/Loading'
import {getMonday} from '../../../lib/dateHelpers'


const someColors = ['#42A5F5', '#009688', '#FF9800', '#F4511E', '#5D4037', '#455A64', '#616161', '#B71C1C'] // This should really come from the API...

const getRosterInformation = (sessionID) => {
  return new Promise((resolve, reject)=> {
    Meteor.call("getRosterInformation", {sessionID: sessionID}, (e, d) => {
      if (e) {
        reject(e)
      } else {
        resolve(d)
      }
    })
  })
}


const _week = new ReactiveVar(getMonday(new Date))
let _direction = ''
let timesheets = null

const navigateLeft = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  let date = _week.get()
  date.setDate(date.getDate() - 7)
  _week.set(date)
  _direction = "left"

  return false;
}

const navigateRight = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  let date = _week.get()
  date.setDate(date.getDate() + 7)
  _week.set(date)
  _direction = "right"
  return false;
}

const refresh = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }

  _week.set(getMonday(new Date))
  timesheets = null
}

const composer = (props, onData) => {
  let week = _week.get()
  if (timesheets == null) {
    getRosterInformation(props.sessionID)
      .then((d) => {
        timesheets = d.content.timecards
        _.each(d.content.customers, (e, i) => {
          e.color = someColors[i]
          Customers.insert(e)
        })
        onData(null, {loading: false, refresh, timesheets: timesheets, navigateLeft, navigateRight, week: week, direction: _direction})
      })
    // .catch((e) => {
    //  alert(`Error fetching roster info : ${e.reason}`)
    // })
  } else {
    onData(null, {refresh, week: week, t: week.getTime(), timesheets: timesheets, navigateLeft, navigateRight, direction: _direction})
  }

}

export default composeWithTracker(composer, Loading)(WeekLayout)



