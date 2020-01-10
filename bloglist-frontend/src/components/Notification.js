import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {
  
  const notification = props
  if (notification.notification.length === 0){
    return null
  }
  
  if(!notification){
    return null}

  if (notification === null)
    return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
  
})

export default connect(
  mapStateToProps, null
)(Notification )