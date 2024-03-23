import React from 'react'
import { useDispatch } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import {
  characterRecoverHp,
  gameWon,
  nextStage,
} from '../../../store/game/gameSlice'
import './DungeonAfterBattle.css'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(characterRecoverHp(15))
  }

  return (
    <>
      <div className="action-buttons-container">
        <RpgButton onClick={() => dispatch(gameWon())} text="Escape" />
        <RpgButton onClick={localNextStage} text="Next Stage" />
      </div>
    </>
  )
}

export default DungeonAfterBattle
