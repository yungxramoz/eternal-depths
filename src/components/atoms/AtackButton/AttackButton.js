import React from 'react'
import './AttackButton.css'

const AttackButton = ({ onClick, attack, disabled }) => {
    const attackImgSrc = require(`../../../assets/images/attacks/${attack.fileName}`)
  return (
    <button className="attack-button" onClick={onClick} disabled={disabled}>
      <div className="rpgui-icon empty-slot">
        <img className='attack-icon' src={attackImgSrc} alt={attack.name} />
      </div>
    </button>
  )
}

export default AttackButton
