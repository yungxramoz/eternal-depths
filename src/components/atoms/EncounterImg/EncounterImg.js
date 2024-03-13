import React from 'react'
import './EncounterImg.css'

const EncounterImg = ({ encounterAnimationState, encounter }) => {
  let encounterImgSrc = require('../../../assets/images/encounters/' +
    encounter.fileName)

  return (
    <div className="encounter-container">
      <img
        className={`encounter-img ${encounterAnimationState}`}
        src={encounterImgSrc}
        alt={encounter.name}
        style={encounter.style}
      />
    </div>
  )
}

export default EncounterImg
