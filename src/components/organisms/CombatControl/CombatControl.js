import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { attackEncounter, battleDefeat } from '../../../store/game/gameSlice'
import {
  calculatedCharacterStats,
  damageCharacter,
} from '../../../store/character/characterSlice'
import RpgButton from '../../atoms/RpgButton/RpgButton'

const CombatControl = ({ attacks }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const encounter = useSelector((state) => state.game.encounter)
  const characterStats = useSelector(calculatedCharacterStats)

  const invokeAttack = (attack) => {
    const { minDamage, maxDamage } = character.items.weapon.stats
    const encounterHpBeforeAttack = encounter.hp
    dispatch(attackEncounter({ attack, characterStats, minDamage, maxDamage }))
    const dealtDamage = encounterHpBeforeAttack - encounter.hp
    dispatch(attack, dealtDamage)

    if (character.hp <= 0) {
      dispatch(battleDefeat())
    }
    if (encounter.hp > 0) {
      recieveDamage()
    }
  }

  const recieveDamage = () => {
    const minDamage = encounter.minDamage
    const maxDamage = encounter.maxDamage
    const damage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
      minDamage +
      encounter.stats.strength

    dispatch(damageCharacter(damage))
    if (character.hp <= 0) {
      dispatch(battleDefeat())
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {attacks.map((attack) => (
        <>
          <RpgButton
            key={attack.id}
            text={attack.name}
            onClick={() => invokeAttack(attack)}
          ></RpgButton>
        </>
      ))}
    </div>
  )
}

export default CombatControl
