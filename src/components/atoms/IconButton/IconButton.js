import React from 'react'
import './IconButton.css'

const IconButton = ({ iconName, onClick }) => {
  const iconPath = `./assets/images/ui/${iconName}.svg`

  return (
    <button className="icon-button" onClick={onClick}>
      <img src={iconPath} alt={iconName} />
    </button>
  )
}

export default IconButton
