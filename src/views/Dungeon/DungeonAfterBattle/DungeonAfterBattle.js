import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import {
  characterRecoverHp,
  gameWon,
  nextStage,
} from '../../../store/game/gameSlice'
import RewardModal from './Modal/RewardModal'
import './DungeonAfterBattle.css'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()
  const [showReward, setShowReward] = useState(true)

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(characterRecoverHp(15))
  }

  return (
    <>
      <RewardModal isOpen={showReward} setIsOpen={setShowReward} />
      <div className="action-buttons-container">
        <RpgButton onClick={() => dispatch(gameWon())} text="Escape" />
        <RpgButton onClick={localNextStage} text="Next Stage" />
      </div>
    </>
  )
}

export default DungeonAfterBattle
