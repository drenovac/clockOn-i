import React from 'react'

class AdminReport extends React.Component {
  render() {
    if (this.props.ready) {
      return (
        <div className="admin-report">
          <h1>Admin Report</h1>
          <table className="table table-condensed table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th>Timesheet ID</th>
              <th>Event Type</th>
              <th>Timestamp</th>
              <th>Lat/Long</th>
              <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {this.props.entries.map((entry) => {
              return (
                <tr key={entry._id}>
                  <td>{entry.timeCard.id}</td>
                  <td>{entry.entryType == 0 ? "Clocked In" : "Clocked Out"}</td>
                  <td>{entry.createdAt.toString()}</td>
                  <td>{entry.position.lat} / {entry.position.long}</td>
                  <td><a target="_blank" href={`http://maps.google.com?z=4&t=m&q=loc:${entry.position.lat}+${entry.position.long}`}>Map</a></td>
                </tr>
              )
            })}
            </tbody>
          </table>

        </div>
      )
    } else {
      return (<div>Loading</div>)
    }
  }
}

export default AdminReport