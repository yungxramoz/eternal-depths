import React from 'react'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'
import './AttackButton.css'

const AttackButton = ({ onClick, attack, disabled }) => {
  const attackImgSrc = require(`../../../assets/images/attacks/${attack.fileName}`)
  return (
    <button className="attack-button" onClick={onClick} disabled={disabled}>
      <RpgContainer golden2 className="attack-container">
        <img className="attack-icon" src={attackImgSrc} alt={attack.name} />
      </RpgContainer>
    </button>
  )
}

export default AttackButton
