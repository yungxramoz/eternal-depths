import React from 'react'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'
import './AttackButton.css'

const AttackButton = ({ onClick, attack, disabled }) => {
  const attackImgSrc = require(`../../../assets/images/attacks/${attack.fileName}`)

  const cooldownPercentage =
    attack.currentCooldown === 0
      ? 61
      : 61 - (attack.currentCooldown / attack.cooldown) * 61
  const cooldownStyle = {
    width: `${cooldownPercentage}px`,
    visibility: attack.currentCooldown === 0 ? 'hidden' : 'visible',
  }

  return (
    <button className="attack-button" onClick={onClick} disabled={disabled}>
      <div className="cooldown-container" style={cooldownStyle}></div>
      <RpgContainer golden2 className="attack-container">
        <img className="attack-icon" src={attackImgSrc} alt={attack.name} />
      </RpgContainer>
    </button>
  )
}

export default AttackButton
