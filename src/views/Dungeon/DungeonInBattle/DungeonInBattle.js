import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DamageIndicator from '../../../components/atoms/DamageIndicator/DamageIndicator'
import AttackButton from '../../../components/molecules/AtackButton/AttackButton'
import Encounter from '../../../components/molecules/Encounter/Encounter'
import HpProgressBar from '../../../components/molecules/ProgressBar/HpProgressBar'
import { EMPTY_ATTACK } from '../../../constants/attack-type'
import {
  calculatedCharacterStats,
  characterAnimateIdle,
  characterAttackEffects,
  characterDamage,
  characterMaxHp,
  encounterAnimateIdle,
  encounterAttack,
  encounterDamage,
  updateGameCycleState,
} from '../../../store/game/gameSlice'
import { calculateDamage } from '../../../utils/attack'
import './DungeonInBattle.css'

const DungeonInBattle = () => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.game.character.current)
  const encounter = useSelector((state) => state.game.encounter.current)
  const isEncounterTurn = useSelector((state) => state.game.isEncounterTurn)
  const turnCounter = useSelector((state) => state.game.turnCounter)
  const encounterAnimationState = useSelector(
    (state) => state.game.encounter.animation,
  )
  const characterStats = useSelector(calculatedCharacterStats)
  const charMaxHp = useSelector(characterMaxHp)

  const [isDisabled, setIsDisabled] = useState(false)

  const [messages, setMessages] = useState([])

  const addIndicator = (type, damage) => {
    setMessages((prev) => [...prev, { type, damage }])
  }

  useEffect(() => {
    dispatch(updateGameCycleState())
    if (isEncounterTurn && encounter.hp > 0) {
      invokeEncounterAttack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnCounter])

  const invokeAttack = async (attack) => {
    setIsDisabled(true)
    let dealtDamage = 0
    const hitCount = attack.hitCount
    for (let i = 0; i < hitCount; i++) {
      const { damage, result } = calculateDamage(
        attack,
        characterStats,
        encounter.stats,
      )
      addIndicator(result, damage)
      dispatch(encounterDamage(damage))
      dealtDamage += damage
      await new Promise((resolve) => setTimeout(resolve, 250))
      dispatch(encounterAnimateIdle())
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    await dispatch(characterAttackEffects({ attack, dealtDamage }))
    setIsDisabled(false)
  }

  const invokeEncounterAttack = async () => {
    setIsDisabled(true)
    const stats = {
      ...encounter.stats,
      minDamage: encounter.minDamage,
      maxDamage: encounter.maxDamage,
    }
    const { damage } = calculateDamage(
      EMPTY_ATTACK,
      stats,
      characterStats,
      true,
    )
    dispatch(encounterAttack())
    dispatch(characterDamage(damage))
    await new Promise((resolve) => setTimeout(resolve, 250))
    dispatch(encounterAnimateIdle())
    dispatch(characterAnimateIdle())
    await new Promise((resolve) => setTimeout(resolve, 50))
    setIsDisabled(false)
  }

  return (
    <>
      <DamageIndicator messages={messages} setMessages={setMessages} />
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
            disabled={
              attack.currentCooldown > 0 || isEncounterTurn || isDisabled
            }
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
