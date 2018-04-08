import React from 'react'

class LoginLayout extends React.Component {
  render() {
    return (
      <div className="accounts-page">
        <div className="hero"></div>

        <div className="accounts-content">
          <h1>{this.props.title}</h1>
          <h2>{this.props.subTitle}</h2>
          <div>
            { this.props.content }
            { this.props.footer }
          </div>
        </div>
      </div>
    )
  }
}

export default LoginLayout