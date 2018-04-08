import React from 'react'
import {composeWithTracker} from 'react-komposer'
import CalendarView from '../components/CalendarView'
import RosterMeSession from '../../../../lib/client/session'
const reactiveLoginDetails = RosterMeSession()
import _ from 'lodash'

const getTimesheets = () => {
  let sessionID = reactiveLoginDetails.get().sessionID
  let customers = reactiveLoginDetails.get().user.customers.map((c) => {return `'${c}'`}).join(",")
  return new Promise((resolve, reject)=> {
    Meteor.call("getTimesheets", {sessionID: sessionID, customers: customers}, (e, d) => {
      if (e) {
        reject(e)
      } else {
        resolve(d)
      }
    })
  })
}

let content = null
const composition = (props, onData) => {
  if (content == null){
    content = {}
    getTimesheets().then((data) => {
      content = data.content
      onData(null, {events: generateEvents(content)})
    }, (e) => {
      onData(null, {events: []})
    })
  }else{
    onData(null, {events: generateEvents(content)})
  }

}


const generateEvents = (data) => {
  let timesheets = data.timecards
  return timesheets.map((t) => {
    var employee = _.find(data.employees, (e) => {return e.id == t.employee})
    let startDate = new Date(`${t.date} ${t.start}`)
    let startTime = parseInt(t.start)
    let endTime = parseInt(t.finish)
    let endDate = null

    if (endTime < startTime){
       endDate = addHours(startDate, (24 - startTime) + endTime)
    }else{
       endDate = addHours(startDate, endTime - startTime)
    }
    return {
      title: `${employee.first_name} ${employee.last_name}`,
      'start':startDate,
      'end': endDate,
      'startTime': t.start,
      'finishTime': t.finish,
      customer : t.customer
    }
  })
}

export default composeWithTracker(composition)(CalendarView)

const addHours = (d,h) => {
  let date = new Date(d)
  date.setTime(date.getTime() + (h*60*60*1000))
  return date
}