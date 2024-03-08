import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AttackButton from '../../components/molecules/AtackButton/AttackButton'
import HpProgressBar from '../../components/molecules/ProgressBar/HpProgressBar'
import {
  attackEffects,
  calculatedCharacterStats,
  damageCharacter,
} from '../../store/character/characterSlice'
import {
  animateIdle,
  attack,
  battleDefeat,
  damageEncounter,
} from '../../store/game/gameSlice'
import { calculateDamage } from '../../utils/attack'
import './DungeonInBattle.css'
import { EMPTY_ATTACK } from '../../constants/attack-type'

const DungeonInBattle = ({ children }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const encounter = useSelector((state) => state.game.encounter)
  const encounterTurn = useSelector((state) => state.game.encounterTurn)
  const characterStats = useSelector(calculatedCharacterStats)

  useEffect(() => {
    setTimeout(() => {
      if (encounterTurn) {
        if (encounter.hp > 0) {
          dispatch(attack())
          const damage = calculateDamage(
            EMPTY_ATTACK,
            encounter.stats,
            encounter.minDamage,
            encounter.maxDamage,
            characterStats,
          )
          dispatch(damageCharacter(damage))
        }
      } else {
        dispatch(animateIdle())
      }
    }, 500)
  }, [encounterTurn, dispatch, encounter, character.hp, characterStats])

  useEffect(() => {
    if (character.hp <= 0) {
      dispatch(battleDefeat())
    }
  }, [character.hp, dispatch])

  const invokeAttack = (attack) => {
    const { minDamage, maxDamage } = character.items.weapon.stats
    const damage = calculateDamage(
      attack,
      characterStats,
      minDamage,
      maxDamage,
      encounter.stats,
    )
    dispatch(damageEncounter(damage))
    dispatch(attackEffects({ attack, dealtDamage: damage }))
  }

  return (
    <>
      {children}
      <HpProgressBar
        prefix="Your "
        currentHp={character.hp}
        maxHp={character.maxHp}
      />
      <div className="combat-control-container">
        {character.attacks.map((attack) => (
          <AttackButton
            key={attack.id}
            disabled={attack.currentCooldown > 0 || encounterTurn}
            attack={attack}
            text={attack.name}
            onClick={() => invokeAttack(attack)}
          ></AttackButton>
        ))}
      </div>
    </>
  )
}

export default DungeonInBattle
