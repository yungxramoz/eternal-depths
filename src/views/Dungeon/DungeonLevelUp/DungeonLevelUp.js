import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import LevelUpModal from './Modal/LevelUpModal'
import { battleVictory } from '../../../store/game/gameSlice'

const DungeonLevelUp = () => {
  const dispatch = useDispatch()

  const [showLevelUp, setShowLevelUp] = useState(true)

  const rewardSelected = () => {
    setShowLevelUp(false)
    dispatch(battleVictory())
  }

  return <LevelUpModal isOpen={showLevelUp} setIsOpen={rewardSelected} />
}

export default DungeonLevelUp
