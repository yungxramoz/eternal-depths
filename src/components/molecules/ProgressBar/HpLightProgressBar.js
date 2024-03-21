import React from 'react'
import LightProgressBar from '../../atoms/LightProgressBar/LightProgressBar'
import './ProgressBar.css'

const HpLightProgressBar = ({ currentHp, maxHp }) => {
  if (currentHp < 0) {
    currentHp = 0
  }

  return (
    <div className="light-progress-container">
      <p className="light-hint-text">
        HP ({currentHp}/{maxHp})
      </p>
      <LightProgressBar max={maxHp} current={currentHp} type="hp" />
    </div>
  )
}

export default HpLightProgressBar
