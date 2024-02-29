import React from 'react'
import RpgProgressBar from '../../atoms/RpgProgressBar/RpgProgressBar'
import './ProgressBar.css'

const XpProgressBar = ({ currentXp, maxXp }) => {
  return (
    <div className="progress-container">
      <p className='hint-text'>
        XP {currentXp}/{maxXp}
      </p>
      <RpgProgressBar max={maxXp} current={currentXp} type="xp" />
    </div>
  )
}

export default XpProgressBar
