import React from 'react'
import {composeWithTracker} from 'react-komposer'
import WeekShift from '../components/WeekShifts'
import moment from 'moment'


const compose = (props, onData) => {
  let week = {}
  let day = props.day.getDate()
  for(let i = 0; i < 7; i++){
    let date = moment(props.day).add(i, 'd')
    week[date] = _.filter(props.timesheets, (obj)=> {
      return moment(date).isSame(obj.date, 'day')
    })
  }

  onData(null, {groupedTimesheets: week, ...props})
}

export default composeWithTracker(compose)(WeekShift)