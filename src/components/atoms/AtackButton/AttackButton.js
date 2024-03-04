import React from 'react'
import './AttackButton.css'

const AttackButton = ({ onClick, attack, disabled }) => {
  return (
    <button className="attack-button" onClick={onClick} disabled={disabled}>
      <div className="rpgui-icon empty-slot"></div>
    </button>
  )
}

export default AttackButton
