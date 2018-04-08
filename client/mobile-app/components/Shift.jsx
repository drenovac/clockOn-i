import React from 'react'

class Shift extends React.Component{
  render() {
    return (
      <div className="shift-card-wrapper" >
        <div className="shift-card">
          <div className="customer">{this.props.shift.customer}</div>
          <div className="meta"><span className="label label-info">{this.props.shift.desc}</span></div>
          <div className="times">
            <p><span className="time_label">From : </span>{this.props.shift.start}</p>
            <p><span className="time_label">To : </span>{this.props.shift.finish}</p>
          </div>
          <div className="clockin">
            {this.renderAction()}
          </div>
        </div>
      </div>
    )
  }
  capture(val) {
    console.log('lets capture ' +val)
    var onSuccess = function (position) {
      let entry = {
        timeCard: {
          id: this.props.shift.id,
          start: this.props.shift.start,
          end: this.props.shift.finish,
          date: this.props.shift.date
        },
        employee: this.props.shift.employee,
        customer: this.props.shift.customer,
        position: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          valid: true
        },
        entryType: val
      }

      Meteor.call("recordEntry", entry, () => {
        this.props.loading(false)
        this.props.success(true)
      })

    }

    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    this.props.loading(true)
    navigator.geolocation.getCurrentPosition(onSuccess.bind(this), onError, {timeout: 5000, enableHighAccuracy: true});
  }
  renderAction() {
    if (this.props.loadingEntries) {
      return (
        <span>Waiting...</span>
      )
    } else {
      if ((this.props.entries.length % 2) == 0){
        return (
          <button onClick={this.capture.bind(this, 0)} className="btn">CLOCK IN</button>
        )
      }else{
        return (
          <button onClick={this.capture.bind(this, 1)} className="btn">CLOCK OUT</button>
        )
      }

    }
  }
}

export default Shift