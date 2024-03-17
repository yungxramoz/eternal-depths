import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AttackButton from '../../../components/molecules/AtackButton/AttackButton'
import Encounter from '../../../components/molecules/Encounter/Encounter'
import HpProgressBar from '../../../components/molecules/ProgressBar/HpProgressBar'
import { EMPTY_ATTACK } from '../../../constants/attack-type'
import {
  battleDefeat,
  calculatedCharacterStats,
  characterAttackEffects,
  characterDamage,
  characterMaxHp,
  encounterAnimateIdle,
  encounterAttack,
  encounterDamage,
} from '../../../store/game/gameSlice'
import { calculateDamage } from '../../../utils/attack'
import './DungeonInBattle.css'

const DungeonInBattle = () => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.game.character.current)
  const encounter = useSelector((state) => state.game.encounter.current)
  const isEncounterTurn = useSelector((state) => state.game.isEncounterTurn)
  const encounterAnimationState = useSelector(
    (state) => state.game.encounter.animation,
  )
  const characterStats = useSelector(calculatedCharacterStats)
  const charMaxHp = useSelector(characterMaxHp)

  useEffect(() => {
    setTimeout(() => {
      if (isEncounterTurn) {
        if (encounter.hp > 0) {
          dispatch(encounterAttack())
          const damage = calculateDamage(
            EMPTY_ATTACK,
            encounter.stats,
            encounter.minDamage,
            encounter.maxDamage,
            characterStats,
          )
          dispatch(characterDamage(damage))
        }
      } else {
        dispatch(encounterAnimateIdle())
      }
    }, 500)
  }, [isEncounterTurn, dispatch, encounter, character.hp, characterStats])

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
    dispatch(encounterDamage(damage))
    dispatch(characterAttackEffects({ attack, dealtDamage: damage }))
  }

  return (
    <>
      <Encounter
        encounterAnimationState={encounterAnimationState}
        encounter={encounter}
        showHp
      />
      <HpProgressBar
        prefix="Your "
        currentHp={character.hp}
        maxHp={charMaxHp}
      />
      <div className="combat-control-container">
        {character.attacks.map((attack) => (
          <AttackButton
            key={attack.id}
            disabled={attack.currentCooldown > 0 || isEncounterTurn}
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
