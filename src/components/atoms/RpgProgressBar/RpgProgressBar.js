import React from 'react'
import './RpgProgressBar.css'

const RpgProgressBar = ({ max, current, type }) => {
  const progress = (current / max) * 100
  let color = 'red'
  switch (type) {
    case 'hp':
      color = 'red'
      break
    case 'xp':
      color = 'purple'
      break
    default:
      break
  }

  return (
    <div className="rpgui-progress" data-rpguitype="progress">
      <div className=" rpgui-progress-track">
        <div className={`rpgui-progress-fill ${color}`} style={{left: '0px', width: `${progress}%`}}></div>
      </div>
      <div className=" rpgui-progress-left-edge"></div>
      <div className=" rpgui-progress-right-edge"></div>
    </div>
  )
}

export default RpgProgressBar
