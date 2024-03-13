import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import { battleStart } from '../../../store/game/gameSlice'

const DungeonBeforeBattle = ({ children }) => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)

  const startBattle = () => {
    dispatch(battleStart())
  }

  return (
    <>
      <h1>Stage {stage}</h1>
      {children}
      <RpgButton onClick={startBattle} text="Start Battle" />
    </>
  )
}

export default DungeonBeforeBattle
