import React from 'react'
import TodaysShift from '../containers/TodaysShifts'
import moment from 'moment'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoadingIndicator from './LoadingIndicator'
import SuccessIndicator from './SuccessIndicator'

class DayLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {LoadingIndicatorVisible: false, SuccessIndicatorVisible: false}
  }

  onSwipe(e) {
    if (e.type === "swipe") {
      if (e.direction === 4) {
        window.setTimeout(() => {
          this.props.navigateLeft(e);
        }, 1)

      }
      if (e.direction === 2) {
        window.setTimeout(() => {
          this.props.navigateRight(e);
        }, 1)
      }
    }
  }

  resetDay(event) {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    this.props.selectDay(null)
    return false;
  }

  render() {
    return (

      <div ref="day">
        <LoadingIndicator ref="LoadingIndicator" indicatorVisible={this.state.LoadingIndicatorVisible}/>
        <SuccessIndicator ref="SuccessIndicator" dismissed={this.onSuccessIndicatorDismissed.bind(this)} indicatorVisible={this.state.SuccessIndicatorVisible}/>

        <div className="roster-layout">

          <div className="header">
            <a className="left" onClick={this.resetDay.bind(this)} href="#"><i className="fa fa-bars"/></a>
            <div className="center">
              <h1>RosterMe</h1>

              <DateLabel ref="DateLabel" direction={this.props.direction} day={this.getDateString()}/>
            </div>
            <a className="right" onClick={this.resetDay.bind(this)} href="#"><i className="invisible fa fa-chevron-left"/></a>
          </div>
          <div className="content">
            <ReactCSSTransitionGroup transitionName={"shift-" + this.props.direction} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              <TodaysShift ref="TodaysShift" timesheets={this.props.timesheets} day={this.props.day} key={this.props.day} success={this.success.bind(this)} loading={this.loading.bind(this)}/>
            </ReactCSSTransitionGroup>
          </div>
          <div className="footer">
            <button onClick={this.refresh.bind(this)} className="btn"><i className="fa fa-refresh"> </i> &nbsp;Refresh</button>
            <button onClick={this.logout.bind(this)} className="btn"><i className="fa fa-sign-out"> </i> &nbsp;Logout</button>
          </div>
        </div>
      </div>
    )
  }

  onSuccessIndicatorDismissed() {
    this.success(false)
  }
  
  loading(visible) {
    if (this.state.LoadingIndicatorVisible !== visible) {
      this.setState({LoadingIndicatorVisible: visible})
    }
  }

  success(visible) {
    if (this.state.SuccessIndicatorVisible !== visible) {
      this.setState({SuccessIndicatorVisible: visible})
    }
  }
  refresh() {
    this.resetDay()
    this.props.refresh()
  }
  logout() {
    this.props.logOut()
  }

  getDateString() {
    return moment(new Date(this.props.day)).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd Do MMMM YYYY',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd Do MMMM YYYY',
      sameElse: 'dddd Do MMMM YYYY'
    })

  }
}

export default DayLayout

class DateLabel extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName={"date-" + this.props.direction} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <h2 key={this.props.day}>
          <span >{this.props.day}</span>
        </h2>
      </ReactCSSTransitionGroup>
    )
  }
}