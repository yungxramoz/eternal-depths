import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import RpgIcon from '../../../components/atoms/RpgIcon/RpgIcon'
import { gameReset } from '../../../store/game/gameSlice'
import './DungeonBattleDefeat.css'

const DungeonBattleDefeat = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)

  const handleRetry = () => {
    dispatch(gameReset())
  }

  return (
    <div className="defeat-container">
      <h2>You Died!</h2>
      <h3>Stage {stage}</h3>
      <RpgIcon icon="skull" />
      <p>
        In the heat of a fierce battle, you met your end. Your name, once
        whispered in the winds, will now fade into silence of oblivion.
      </p>
      <RpgButton text="End" onClick={handleRetry} />
    </div>
  )
}

export default DungeonBattleDefeat
