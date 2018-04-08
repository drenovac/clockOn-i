import React from 'react'

const Loading = () => {
  return (
    <div className="roster-layout">
      <div className="header">
        <div className="center">
          <h1>RosterMe</h1>
          <h2>Loading</h2>
        </div>
      </div>
      <div className="content loading">
        <i className="fa fa-spin fa-circle-o-notch"></i>
      </div>
      <div className="footer">
      </div>
    </div>
  )
}

export default Loading