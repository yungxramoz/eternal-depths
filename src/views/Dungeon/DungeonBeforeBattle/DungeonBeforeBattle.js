import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import CharacterHeader from '../../../components/organisms/CharacterHeader/CharacterHeader'
import { maxHp, maxXp } from '../../../store/character/characterSlice'
import { battleStart } from '../../../store/game/gameSlice'
import './DungeonBeforeBattle.css'

const DungeonBeforeBattle = ({ children }) => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)
  const character = useSelector((state) => state.character.current)
  const characterMaxXp = useSelector(maxXp)
  const characterMaxHp = useSelector(maxHp)

  const startBattle = () => {
    dispatch(battleStart())
  }

  return (
    <>
      <h2>Stage {stage}</h2>
      <CharacterHeader
        character={character}
        maxHp={characterMaxHp}
        maxXp={characterMaxXp}
      />
      {children}
      <RpgButton onClick={startBattle} text="Start Battle" />
    </>
  )
}

export default DungeonBeforeBattle
