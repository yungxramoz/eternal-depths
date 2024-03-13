import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import { recoverHp } from '../../store/character/characterSlice'
import { gameWon, nextStage } from '../../store/game/gameSlice'
import './DungeonAfterBattle.css'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(recoverHp(15))
  }

  return (
    <>
      <h1>Stage {stage}</h1>
      <div className="action-buttons-container">
        <RpgButton onClick={() => dispatch(gameWon())} text="Escape" />
        <RpgButton onClick={localNextStage} text="Next Stage" />
      </div>
    </>
  )
}

export default DungeonAfterBattle
