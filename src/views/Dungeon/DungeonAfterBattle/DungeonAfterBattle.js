import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import {
  gainXp,
  maxHp,
  maxXp,
  recoverHp,
} from '../../../store/character/characterSlice'
import { gameWon, nextStage } from '../../../store/game/gameSlice'
import RewardModal from './Modal/RewardModal'
import './DungeonAfterBattle.css'
import CharacterHeader from '../../../components/organisms/CharacterHeader/CharacterHeader'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)
  const character = useSelector((state) => state.character.current)
  const characterMaxHp = useSelector(maxHp)
  const characterMaxXp = useSelector(maxXp)
  const [showReward, setShowReward] = useState(true)

  const localGainXp = () => {
    let xp = 0
    if (stage < 5) xp = 5
    else if (stage < 10) xp = 8
    else if (stage < 15) xp = 12
    else if (stage < 20) xp = 20
    else xp = 30
    dispatch(gainXp(xp))
  }

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(recoverHp(15))
  }

  const rewardSelected = () => {
    setShowReward(false)
    localGainXp()
  }

  return (
    <>
      <RewardModal isOpen={showReward} setIsOpen={rewardSelected} />
      <CharacterHeader
        character={character}
        maxHp={characterMaxHp}
        maxXp={characterMaxXp}
      />
      <h2>Stage {stage}</h2>
      <div className="action-buttons-container">
        <RpgButton onClick={() => dispatch(gameWon())} text="Escape" />
        <RpgButton onClick={localNextStage} text="Next Stage" />
      </div>
    </>
  )
}

export default DungeonAfterBattle
