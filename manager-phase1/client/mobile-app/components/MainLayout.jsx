import React from 'react'
import DayLayout from '../containers/DayLayout'
import WeekLayout from '../containers/WeekLayout'

class MainLayout extends React.Component {


  login(event) {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.loginWithCredentials(username, password)

  }

  render() {
    if (this.props.loggedIn) {
      return (
        <WeekLayout logOut={this.props.logOut} sessionID={this.props.sessionID} loggedOut={this.props.loggedOut}/>
      )
    } else {
      return (
        <div className="login-form">

          {this.getErrorMessage()}
          <h1>Login</h1>
          <form onSubmit={this.login.bind(this)}>
            <input type="text" ref="username" placeholder="Your username"/>
            <input type="password" ref="password" placeholder="Your password"/>
            {this.getLogginInStatus()}
            <input className={this.props.logginIn ? "btn loading": "btn"} type="submit" ref="submit" value="Login"/>
          </form>
        </div>
      )

    }

  }

  getErrorMessage() {
    if (this.props.error && !this.props.logginIn) {
      return (
        <div className="alert alert-danger">Please try again</div>
      )
    }
  }

  getLogginInStatus() {
    if (this.props.logginIn) {
      return (
        <div className="spinner">
          <i className="fa fa-circle-o-notch fa-spin"></i>
        </div>
      )
    }
  }
}

export default MainLayout