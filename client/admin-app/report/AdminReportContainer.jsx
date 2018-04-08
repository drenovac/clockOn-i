import React from 'react'
import {composeWithTracker} from 'react-komposer'
import AdminReport from './AdminReport'

const compose = (props, onData) => {
  let entriesSub = Meteor.subscribe("AdminEntries")
  let isReady = entriesSub.ready()
  let entries = TimeEntries.find({}, {sort: {createdAt: -1}}).fetch()
  onData(null, {ready: isReady, entries})
}

export default composeWithTracker(compose)(AdminReport)