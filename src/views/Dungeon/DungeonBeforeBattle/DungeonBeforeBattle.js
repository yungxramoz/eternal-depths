import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import Encounter from '../../../components/molecules/Encounter/Encounter'
import { battleStart } from '../../../store/game/gameSlice'
import './DungeonBeforeBattle.css'

const DungeonBeforeBattle = ({ children }) => {
  const dispatch = useDispatch()
  const encounter = useSelector((state) => state.game.encounter.current)

  const startBattle = () => {
    dispatch(battleStart())
  }

  return (
    <>
      <Encounter encounter={encounter} />
      <RpgButton onClick={startBattle} text="Start Battle" />
    </>
  )
}

export default DungeonBeforeBattle
