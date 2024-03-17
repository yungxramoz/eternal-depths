import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LevelUpModal from './Modal/LevelUpModal'
import {
  battleVictory,
  characterLevelUp,
  characterMaxXp,
} from '../../../store/game/gameSlice'

const DungeonLevelUp = () => {
  const dispatch = useDispatch()
  const charMaxXp = useSelector(characterMaxXp)
  const character = useSelector((state) => state.game.character.current)

  const [showLevelUp, setShowLevelUp] = useState(true)

  const rewardSelected = () => {
    setShowLevelUp(false)
    dispatch(battleVictory())
  }

  useEffect(() => {
    if (character.xp >= charMaxXp) {
      setShowLevelUp(false)
      dispatch(characterLevelUp())
    }
  }, [character.xp, charMaxXp, dispatch])

  return <LevelUpModal isOpen={showLevelUp} setIsOpen={rewardSelected} />
}

export default DungeonLevelUp
