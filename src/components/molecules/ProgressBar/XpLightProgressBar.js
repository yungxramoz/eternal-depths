import React from 'react'
import LightProgressBar from '../../atoms/LightProgressBar/LightProgressBar'
import './ProgressBar.css'

const XpLightProgressBar = ({ currentLvl, currentXp, maxXp }) => {
  if (currentXp < 0) {
    currentXp = 0
  }

  return (
    <div className="light-progress-container">
      <p className="light-hint-text">
        Level {currentLvl} ({currentXp}/{maxXp})
      </p>
      <LightProgressBar max={maxXp} current={currentXp} type="xp" />
    </div>
  )
}

export default XpLightProgressBar
