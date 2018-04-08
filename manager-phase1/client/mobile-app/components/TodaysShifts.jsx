import React from 'react'
import _ from 'lodash'
import iScroll from '../../../node_modules/iscroll/build/iscroll-lite'
import Shift from '../containers/Shift'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: true,
  scrollY: true,
  click: false
}


class TodaysShifts extends React.Component {
  
  componentDidMount() {
  window.setTimeout(() => {
    var myScroll = new iScroll(this.refs.shifts, iScrollOptions);
  }, 201)
  
}
  componentDidUpdate() {
    window.setTimeout(() => {
      var myScroll = new iScroll(this.refs.shifts, iScrollOptions);
    }, 1)
  }

  render() {
    return (
      <div ref="shifts" className="shifts day">
        <div>
          {this.renderEmpty()}
          {
            this.props.todaysShifts.map((shift) => {
              return (
                <Shift shift={shift} key={shift.id} {...this.props} />
              )
            })
          }
        </div>
      </div>
    )
  }

  renderEmpty() {
    if (this.props.todaysShifts.length == 0) {
      return (
        <div className="none">No Shifts</div>
      )
    }
  }

}

export default TodaysShifts