import React from 'react'

class SuccessIndicator extends React.Component {
  render() {
    if (this.props.indicatorVisible) {
      return (
        <div className="loading-indicator">
          <div >
            <i className="fa fa-check"/>
            <p>Success</p>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  componentDidUpdate() {
    if (this.props.indicatorVisible) {
      window.setTimeout(() => {
        this.props.dismissed()

      }, 2000)
      
    }
  }
}

export default SuccessIndicator