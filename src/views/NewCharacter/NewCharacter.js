import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import CharacterChooser from '../../components/organisms/CharacterChooser/CharacterChooser'
import EditStatsPanel from '../../components/organisms/EditStatsPanel/EditStatsPanel'
import GoBackButton from '../../components/organisms/GoBackButton/GoBackButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../components/templates/RpgSeperator/RpgSeparator'
import {
  assignAttributePoint,
  setLook,
  setName,
} from '../../state/character/characterSlice'
import './NewCharacter.css'
import { startGame } from '../../state/game/gameSlice'
import { useNavigate } from 'react-router'

const NewCharacter = () => {
  const navigate = useNavigate()
  const gameState = useSelector((state) => state.game.gameState)
  React.useEffect(() => {
    if (gameState === 'playing') {
      navigate('/dungeon')
    }
  })

  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const initialPoints = useSelector(
    (state) => state.character.availableAttributePoints,
  )
  const [localName, setLocalName] = useState(character.name)
  const [assignedPoints, setAssignedPoints] = useState({
    health: 0,
    strength: 0,
    agility: 0,
    precision: 0,
  })
  const [characterLook, setCharacterLook] = useState(0)

  const isCreateDisabled = () => {
    return (
      !localName ||
      Object.values(assignedPoints).reduce((a, b) => a + b, 0) !== initialPoints
    )
  }

  const createCharacter = (assignedPoints) => {
    dispatch(setName(localName))
    dispatch(setLook(characterLook))
    dispatch(assignAttributePoint(assignedPoints))
    resetLocalFields()
    dispatch(startGame())
  }

  const resetLocalFields = () => {
    setLocalName('')
    setCharacterLook(0)
    setAssignedPoints({
      health: 0,
      strength: 0,
      agility: 0,
      precision: 0,
    })
  }

  return (
    <RpgContainer fullPage>
      <GoBackButton className="align-self-start" />
      <h1>New Character</h1>
      <CharacterChooser onCharacterChange={setCharacterLook} />
      <input
        type="text"
        placeholder="Name"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
      />
      <RpgSeparator />
      <EditStatsPanel
        localStats={character.stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />
      <div className="btn-container">
        <RpgButton
          text="Create"
          disabled={isCreateDisabled()}
          onClick={() => createCharacter(assignedPoints)}
        />
      </div>
    </RpgContainer>
  )
}

export default NewCharacter
