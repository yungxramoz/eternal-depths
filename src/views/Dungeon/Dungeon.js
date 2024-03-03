import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import HpProgressBar from '../../components/molecules/ProgressBar/HpProgressBar'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import {
  calculatedCharacterStats,
  damageCharacter,
  recoverHp,
} from '../../store/character/characterSlice'
import {
  damageEncounter,
  gameWon,
  nextStage,
  battleStart,
  battleDefeat,
} from '../../store/game/gameSlice'
import './Dungeon.css'

const Dungeon = () => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const characterStats = useSelector(calculatedCharacterStats)
  const encounter = useSelector((state) => state.game.encounter)
  const stageFileName = useSelector((state) => state.game.stageFileName)
  const stage = useSelector((state) => state.game.stage)
  const gameCycleState = useSelector((state) => state.game.gameCycleState)

  const showEncounter = useMemo(() => {
    return (
      gameCycleState === GAME_CYCLE_STATE.ENCOUNTER ||
      gameCycleState === GAME_CYCLE_STATE.BATTLE
    )
  }, [gameCycleState])

  let encounterImgSrc = require('../../assets/images/encounters/' +
    encounter.fileName)
  let stageImgSrc = require('../../assets/images/rooms/' + stageFileName)

  const dealDamage = () => {
    const { minDamage, maxDamage } = character.items.weapon.stats
    const damage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
      minDamage +
      characterStats.strength

    dispatch(damageEncounter(damage))

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

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(recoverHp(15))
  }

  const encounterHeader = () => {
    if (gameCycleState === GAME_CYCLE_STATE.BATTLE) {
      return <HpProgressBar currentHp={encounter.hp} maxHp={encounter.maxHp} />
    }
    return <h3>Stage: {stage}</h3>
  }

  const encounterActions = () => {
    if (gameCycleState === GAME_CYCLE_STATE.ENCOUNTER) {
      return (
        <RpgButton
          text="Start Battle"
          onClick={() => dispatch(battleStart())}
        />
      )
    } else if (gameCycleState === GAME_CYCLE_STATE.BATTLE) {
      return <RpgButton text="Attack" onClick={dealDamage} />
    } else {
      return (
        <>
          <RpgButton
            text="Escape Dungeon"
            onClick={() => dispatch(gameWon())}
          />
          <RpgButton text="Next Stage" onClick={localNextStage} />
        </>
      )
    }
  }

  return (
    <RpgContainer fullPage bgImg={stageImgSrc}>
      {showEncounter ? (
        <h1>
          {encounter.name} Lvl {encounter.level}
        </h1>
      ) : null}
      {encounterHeader()}
      <div className="encounter-container">
        {showEncounter ? (
          <img
            className="encounter-img"
            src={encounterImgSrc}
            alt={encounter.name}
            style={encounter.style}
          />
        ) : null}
      </div>
      {gameCycleState === GAME_CYCLE_STATE.BATTLE ? (
        <HpProgressBar currentHp={character.hp} maxHp={character.maxHp} />
      ) : null}
      {encounterActions()}
    </RpgContainer>
  )
}

export default Dungeon
