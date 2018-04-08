import React from 'react'
import {composeWithTracker} from 'react-komposer'
import RosterLayout from '../components/DayLayout.jsx'
import Loading from '../components/Loading'


const composer = (props, onData) => {
  onData(null, {day: props.day, t: new Date(props.day).getTime(), timesheets: props.timesheets})
}

export default composeWithTracker(composer, Loading)(RosterLayout)






