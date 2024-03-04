import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  attackEffects,
  calculatedCharacterStats,
  damageCharacter,
} from '../../../store/character/characterSlice'
import {
  animateAttack,
  animateDamage,
  battleDefeat,
  damageEncounter,
} from '../../../store/game/gameSlice'
import { calculateDamage } from '../../../utils/attack'
import AttackButton from '../../molecules/AtackButton/AttackButton'
import './CombatControl.css'

const CombatControl = ({ attacks }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const encounter = useSelector((state) => state.game.encounter)
  const characterStats = useSelector(calculatedCharacterStats)
  const [encounterTurn, setEncounterTurn] = useState(false)

  const invokeAttack = async (attack) => {
    const { minDamage, maxDamage } = character.items.weapon.stats
    const damage = calculateDamage(attack, characterStats, minDamage, maxDamage)
    await dispatch(damageEncounter(damage))
    await dispatch(animateDamage())
    await dispatch(attackEffects({ attack, dealtDamage: damage }))
    setEncounterTurn(true)
    checkCharacterDefeat()

    setTimeout(() => {
      if (encounter.hp > 0) {
        dispatch(animateAttack())
        recieveDamage()
        checkCharacterDefeat()
        setEncounterTurn(false)
      }
    }, 500)
  }

  const checkCharacterDefeat = () => {
    if (encounter.hp <= 0) {
      dispatch(battleDefeat())
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
    <div className="combat-control-container">
      {attacks.map((attack) => (
        <AttackButton
          key={attack.id}
          disabled={attack.currentCooldown > 0 || encounterTurn}
          attack={attack}
          text={attack.name}
          onClick={() => invokeAttack(attack)}
        ></AttackButton>
      ))}
    </div>
  )
}

export default CombatControl
