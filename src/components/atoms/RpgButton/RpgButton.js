import React from 'react'
import './RpgButton.css'

const RpgButton = ({ text, disabled, golden, onClick }) => {
  const btnClasses = ['rpgui-button btn']
  if (golden) btnClasses.push('golden')
  return (
    <button
      className={btnClasses.join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default RpgButton
