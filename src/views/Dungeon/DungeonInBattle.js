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

const DungeonInBattle = ({ children }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const encounter = useSelector((state) => state.game.encounter)
  const encounterTurn = useSelector((state) => state.game.encounterTurn)
  const characterStats = useSelector(calculatedCharacterStats)

  useEffect(() => {
    const attackCharacter = () => {
      const minDamage = encounter.minDamage
      const maxDamage = encounter.maxDamage
      const damage =
        Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
        minDamage +
        encounter.stats.strength

      dispatch(damageCharacter(damage))
    }
    setTimeout(() => {
      if (encounterTurn) {
        if (encounter.hp > 0) {
          dispatch(attack())
          attackCharacter()
        }
      } else {
        dispatch(animateIdle())
      }
    }, 500)
  }, [encounterTurn, dispatch, encounter, character.hp])

  useEffect(() => {
    if (character.hp <= 0) {
      dispatch(battleDefeat())
    }
  }, [character.hp, dispatch])

  const invokeAttack = (attack) => {
    const { minDamage, maxDamage } = character.items.weapon.stats
    const damage = calculateDamage(attack, characterStats, minDamage, maxDamage)
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
