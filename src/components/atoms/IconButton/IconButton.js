import React from 'react'
import './IconButton.css'

const IconButton = ({ iconName }) => {
  const iconPath = `./assets/images/ui/${iconName}.svg`

  return (
    <button className="icon-button">
      <img src={iconPath} alt={iconName} />
    </button>
  )
}

export default IconButton
