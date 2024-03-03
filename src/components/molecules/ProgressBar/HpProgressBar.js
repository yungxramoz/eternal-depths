import React from 'react'
import RpgProgressBar from '../../atoms/RpgProgressBar/RpgProgressBar'
import './ProgressBar.css'

const HpProgressBar = ({ currentHp, maxHp }) => {
  if (currentHp < 0) {
    currentHp = 0
  }

  return (
    <div className="progress-container">
      <p className="hint-text">
        HP {currentHp}/{maxHp}
      </p>
      <RpgProgressBar max={maxHp} current={currentHp} type="hp" />
    </div>
  )
}

export default HpProgressBar
