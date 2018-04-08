import React from 'react'

class Layout extends React.Component{
  toggleSidebar(e){
    e.preventDefault()
    let sidebar = this.refs.sidebar
    this.props.toggleSidebar(sidebar)
  }
  render() {
    return (
      <div className="roster-layout manager-app">
        <div className="header">
          <a className="left" onClick={this.toggleSidebar.bind(this)} href="#"><i className="fa fa-cog"/></a>
          <div className="center">
            <h1>{this.props.companyName}</h1>
            <span>Logged in as {this.props.fullName}</span>
          </div>
          <a className="right" onClick={this.props.logOut} href="#"><i className="fa fa-sign-out"/></a>
        </div>
        <div className="layout">
          <div ref="sidebar" className="sidebar">
            {this.props.sidebar}
          </div>
          <div className="main-block">
            <div className="content">
              {this.props.content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Layout