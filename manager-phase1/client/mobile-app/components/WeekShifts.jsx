import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import $ from 'jquery'
import iScroll from '../../../node_modules/iscroll/build/iscroll'
const iScrollOptions = {
  mouseWheel: true,
  scrollY: true,
  tap: true
}

class WeekShifts extends React.Component {
  constructor(props){
    super(props)
    this.scroller = null
  }
  componentDidMount() {
    this.scroller = new iScroll(this.refs.shifts,  iScrollOptions)
    $(this.refs.shifts).find("> div").on("tap", (e) => {
      $(e.target).trigger("click")
    });
    window.setTimeout(() => {
      this.scroller.refresh()
    }, 201)

  }
  // componentWillUpdate(){
  //   this.scroller.destroy()
  // }
  componentWillUnmount(){
    this.scroller.destroy()
  }
  // componentDidUpdate() {
  //   this.scroller = new iScroll(this.refs.shifts,  { click: true });
  //
  //   window.setTimeout(() => {
  //     this.scroller.refresh()
  //   }, 1)
  // }

  render() {
    let groups = this.props.groupedTimesheets
    return (<div ref="shifts" className="shifts">
      <div>
        {
          _.keys(groups).map((day) => {
            return (
              <div onClick={this.selectDay.bind(this, day)} className="shift-card-wrapper" key={day}>
                <div className="shift-card shift-day">
                  <h1>{moment(new Date(day)).format("dddd Do MMMM YYYY")}</h1>
                  {this.renderEmptyDay(groups[day])}
                  {groups[day].map((shift) => {
                    return (
                      <div className="shift" style={{borderColor: this.getCustomerColor(shift.customer)}} key={shift.id}>
                        <div >
                          <p><strong>{shift.customer}</strong></p>
                          <div className="times">
                            <p><span className="time_label">From : </span>{shift.start} <span className="time_label">To : </span>{shift.finish}</p>
                          </div>
                          <p>{this.getCustomerAddress(shift.customer)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            )
          })}
      </div>
    </div>)

  }
  getCustomerColor(customer) {
    return Customers.findOne({id: customer}).color
  }

  getCustomerAddress(customer) {
    let addy = Customers.findOne({id: customer}).address
    return `${addy.street}, ${addy.suburb}, ${addy.state}, ${addy.postcode}`
  }

  renderEmptyDay(group) {
    if (group.length === 0){
      return (
        <div className="no-shifts">NO SHIFTS</div>
      )
    }
  }

  selectDay(day) {
    this.props.selectDay(day)
  }
}

export default WeekShifts