import React from 'react'

import offline from './offline.png'
import './ErrorMessage.css'

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <div className="error-message image">
        <img alt="" src={offline} style={{ width: 300 }} />
      </div>
      <div className="error-message text">
        <p>Oops!!!</p>
        <p>Check your internet connection!</p>
      </div>
    </div>
  )
}

export default ErrorMessage
