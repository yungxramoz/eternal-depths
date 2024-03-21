import React from 'react'
import './LightProgressBar.css'

const LightProgressBar = ({ current, max, type }) => {
  const progress = (current / max) * 100
  let color = 'red'
  switch (type) {
    case 'hp':
      color = 'red'
      break
    case 'xp':
      color = 'blue'
      break
    default:
      break
  }
  return (
    <div className="light-progress-bar">
      <div className="rpgui-progress-track light-progress-track">
        <div
          className={`rpgui-progress-fill ${color} progress-animation`}
          style={{ left: '0px', width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default LightProgressBar
