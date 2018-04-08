import React from 'react'
import _ from 'lodash'
import moment from 'moment'

class ShiftView extends React.Component {
  week(inc) {
    event.preventDefault()
    this.props.incrementWeek(inc)
  }

  tableView() {
    if (this.props.reloading) {
      return (<div className="loading"><i className="fa fa-circle-o-notch fa-spin"> </i></div>)
    }
    if (_.keys(this.props.events).length == 0) {
      return (<div className="empty">No Data</div>)
    }
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th colSpan="2">Employee</th>
            <th>{moment(this.props.currentWeek).format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(1, 'd').format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(2, 'd').format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(3, 'd').format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(4, 'd').format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(5, 'd').format("dddd Do")}</th>
            <th>{moment(this.props.currentWeek).add(6, 'd').format("dddd Do")}</th>
          </tr>
          </thead>
          <tbody>
          {generateRows(this.props.events, this.props.currentWeek)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {

    return (
      <div className="shift-view box calendar">
        <div className="title">
          <div className="left"><i onClick={this.week.bind(this, -1)} className="fa fa-chevron-left"> </i></div>
          Week Commencing : {moment(this.props.currentWeek).format('Do MMM YYYY')}
          <div className="right"><i onClick={this.week.bind(this, 1)} className="fa fa-chevron-right"> </i></div>
        </div>
        {this.tableView()}
      </div>
    )
  }
}


const generateRows = (events, currentWeek) => {
  let rows = []
  _.each(_.keys(events), ((site) => {
    rows.push((
      <tr>
        <td className="site" colSpan="9">SITE: {site}</td>
      </tr>
    ))
    let employeeEvents = groupEventsByEmployee(events[site])
    _.each(_.keys(employeeEvents), (employee) => {
      rows.push((
        <tr>
          <td className="indent"></td>
          <td className="employee">{employee}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 0)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 1)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 2)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 3)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 4)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 5)}</td>
          <td>{eventsForDay(employeeEvents[employee], currentWeek, 6)}</td>
        </tr>
      ))
    })

  }))

  return rows
}

const groupEventsByEmployee = (events) => {

  return _.groupBy(events, (event) => {
    return event.title
  })

}

const eventsForDay = (events, currentWeek, day) => {
  let currentDay = moment(new Date(currentWeek)).add(day, 'd')

  let cards = []
  let currentEvents = _.filter(events, (event) => {
    return moment(new Date(event.start)).isSame(currentDay, 'day')
  })
  _.each(currentEvents, (event) => {
    cards.push((
      <div className="event">{event.startTime} - {event.finishTime}</div>
    ))
  })
  return cards
}

export default ShiftView