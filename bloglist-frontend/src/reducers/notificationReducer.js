const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION_CHANGE':
      return action.content
    case 'NOTIFICATION_CLEAN':
      return ''
    default:
      return state
  }
}
  
export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFICATION_CHANGE',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION_CLEAN'
      })
    }, seconds*1000)
  }
}

export const notificationChange = (message) => {
  return {
    type: 'NOTIFICATION_CHANGE',
      message
  }
}

export const notificationClean = () => {
  return{
    type: 'NOTIFICATION_CLEAN'
  }
}
  
export default notificationReducer