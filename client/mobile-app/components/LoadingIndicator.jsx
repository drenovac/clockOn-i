import React from 'react'

class LoadingIndicator extends React.Component {
  render() {
    if (this.props.indicatorVisible){
      return (
        <div className="loading-indicator">
          <div >
            <i className="fa fa-spin fa-circle-o-notch" />
            <p>Please Wait</p>
          </div>
        </div>
      )
    }else{
      return <div></div>
    }

  }
}

export default LoadingIndicator