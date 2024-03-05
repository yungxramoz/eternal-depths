import React from 'react'
import EncounterImg from '../../atoms/EncounterImg/EncounterImg'
import HpProgressBar from '../ProgressBar/HpProgressBar'
import './Encounter.css'

const Encounter = ({ encounterAnimationState, encounter, showHp }) => {
  return (
    <>
      <h1>
        {encounter.name} Lvl {encounter.level}
      </h1>
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
