import React from 'react'
import {composeWithTracker} from 'react-komposer'
import TodaysShift from '../components/TodaysShifts'

const daysBetween = (first, second) => {
  var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisBetween = two.getTime() - one.getTime();
  var days = millisBetween / millisecondsPerDay;

  return Math.floor(days);
}

const idsFromTimesheets = (timesheets) => {

  return _.map(timesheets, function(e, i){
    return e.id
  })
}
const composer = (props, onData) => {
  let employeeId = -1
  if (props.timesheets.length > 0){
    employeeId = props.timesheets[0].employee
  }
  var h = Meteor.subscribe("timeCards", idsFromTimesheets(todaysShifts(props)), employeeId)

  if (h.ready()){

    onData(null, {todaysShifts: todaysShifts(props), timeEntries: TimeEntries.find().fetch(), loadingEntries: false})
  }else {
    onData(null, {todaysShifts: todaysShifts(props), timeEntries: null, loadingEntries: true})
  }
}

const todaysShifts = (props) => {
  let day = new Date(props.day)
  let shifts = []
  shifts = _.filter(props.timesheets, (item) => {
    return (daysBetween(new Date(item.date), day) === 0)
  })
  return shifts
}

export default composeWithTracker(composer)(TodaysShift)