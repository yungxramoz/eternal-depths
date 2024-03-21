import React from 'react'
import EncounterImg from '../../atoms/EncounterImg/EncounterImg'
import HpProgressBar from '../ProgressBar/HpProgressBar'
import './Encounter.css'

const Encounter = ({ encounterAnimationState, encounter, showHp }) => {
  return (
    <>
      {showHp ? (
        <>
          <p>
            {encounter.name} Lvl {encounter.level}
          </p>
          <HpProgressBar currentHp={encounter.hp} maxHp={encounter.maxHp} />
        </>
      ) : null}
      <EncounterImg
        encounterAnimationState={encounterAnimationState}
        encounter={encounter}
      />
      {!showHp ? (
        <p className="encounter-name">
          {encounter.name} Lvl {encounter.level}
        </p>
      ) : null}
    </>
  )
}

export default Encounter
