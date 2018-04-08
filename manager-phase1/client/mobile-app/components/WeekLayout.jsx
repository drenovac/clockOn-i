import React from 'react'
import moment from 'moment'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Hammer from 'react-hammerjs'
import LoadingIndicator from './LoadingIndicator'
import SuccessIndicator from './SuccessIndicator'
import {getMonday} from '../../../lib/dateHelpers'
import WeekShifts from '../containers/WeekShifts'
import DayLayout from '../containers/DayLayout'

class WeekLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {LoadingIndicatorVisible: false, SuccessIndicatorVisible: false, selectedDay: null}
  }

  componentWillReceiveProps(props) {
    this.setState({LoadingIndicatorVisible: props.loading})
  }
  
  selectDay(day) {
    this.setState({selectedDay: day})
  }
  
  render() {
    let component = null
    if (this.state.selectedDay) {
      component = (<DayLayout key="day-layout" refresh={this.refresh.bind(this)} selectDay={this.selectDay.bind(this)} day={this.state.selectedDay} timesheets={this.props.timesheets} logOut={this.props.logOut} sessionID={this.props.sessionID} loggedOut={this.props.loggedOut}/>)
    } else {
      component = null
    }

    return (


      <div >
        <ReactCSSTransitionGroup  transitionName="day" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {component}
        </ReactCSSTransitionGroup>
        <LoadingIndicator ref="LoadingIndicator" indicatorVisible={this.state.LoadingIndicatorVisible}/>
        <SuccessIndicator ref="SuccessIndicator" dismissed={this.onSuccessIndicatorDismissed.bind(this)} indicatorVisible={this.state.SuccessIndicatorVisible}/>
        <Hammer onSwipe={this.onSwipe.bind(this)} options={{preventDefault: true, dragLockToAxis: true, dragBlockHorizontal: true}}>

          <div className="roster-layout">

            <div className="header">
              <a className="left" onClick={this.props.navigateLeft} href="#"><i className="fa fa-chevron-left"/></a>
              <div className="center">
                <h1>RosterMe</h1>

                <DateLabel ref="DateLabel" direction={this.props.direction} day={this.getDateString()}/>
              </div>
              <a className="right" onClick={this.props.navigateRight} href="#"><i className="fa fa-chevron-right"/></a>
            </div>
            <div className="content">
              <ReactCSSTransitionGroup transitionName={"shift-" + this.props.direction} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <WeekShifts selectDay={this.selectDay.bind(this)} ref="TodaysShift" timesheets={this.props.timesheets} day={this.props.week} key={this.props.week} success={this.success.bind(this)} loading={this.loading.bind(this)}/>
              </ReactCSSTransitionGroup>
            </div>
            <div className="footer">
              <button onClick={this.refresh.bind(this)} className="btn"><i className="fa fa-refresh"> </i> &nbsp;Refresh</button>
              <button onClick={this.logout.bind(this)} className="btn"><i className="fa fa-sign-out"> </i> &nbsp;Logout</button>
            </div>
          </div>
        </Hammer>
      </div>
    )

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
  refresh(){
    this.loading(true)
    this.props.refresh()
  }
  logout() {
    this.props.logOut()
  }
  
  getDateString() {
    if (moment(this.props.week).isSame(getMonday(new Date()))) {
      return "This Week"
    } else {
      return moment(this.props.week).format('[Week Starting] dddd Do MMMM YYYY')
    }
    
    
  }
}

export default WeekLayout


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

