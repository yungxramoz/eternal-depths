import React from 'react'
import './RpgButton.css'

const RpgButton = ({ text, onClick, golden }) => {
  const btnClasses = ['rpgui-button btn']
  if (golden) btnClasses.push('golden')
  return (
    <button className={btnClasses.join(' ')} onClick={onClick}>
      {text}
    </button>
  )
}

export default RpgButton
