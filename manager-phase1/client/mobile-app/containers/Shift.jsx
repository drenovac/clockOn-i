import React from 'react'
import {composeWithTracker} from 'react-komposer'
import Shift from '../components/Shift'

const composer = (props, onData) => {
  let entries = TimeEntries.find({'timeCard.id': props.shift.id}).fetch()
  onData(null, {entries, ...props})

}

export default composeWithTracker(composer)(Shift)

