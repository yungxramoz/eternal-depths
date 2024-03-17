import React from 'react'
import EncounterImg from '../../atoms/EncounterImg/EncounterImg'
import HpProgressBar from '../ProgressBar/HpProgressBar'
import './Encounter.css'

const Encounter = ({ encounterAnimationState, encounter, showHp }) => {
  return (
    <>
      <p>
        {encounter.name} Lvl {encounter.level}
      </p>
      {showHp ? (
        <HpProgressBar currentHp={encounter.hp} maxHp={encounter.maxHp} />
      ) : null}
      <EncounterImg
        encounterAnimationState={encounterAnimationState}
        encounter={encounter}
      />
    </>
  )
}

export default Encounter
