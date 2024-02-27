import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import IconButton from '../../components/molecules/IconButton/IconButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../components/templates/RpgSeperator/RpgSeparator'
import {
  assignAttributePoint,
  setName,
} from '../../state/character/characterSlice'
import './NewCharacter.css'
import EditStatsPanel from '../../components/organisms/EditStatsPanel/EditStatsPanel'

const NewCharacter = () => {
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

  const createCharacter = (assignedPoints) => {
    dispatch(setName(localName))
    dispatch(assignAttributePoint(assignedPoints))
    resetLocalFields()
  }

  const resetLocalFields = () => {
    setLocalName('')
    setAssignedPoints({
      health: 0,
      strength: 0,
      agility: 0,
      precision: 0,
    })
  }

  return (
    <RpgContainer fullPage>
      <h1>New Character</h1>
      <RpgSeparator />
      <div className="look-container">
        <IconButton icon="chevron-left" />
        <div className="rpgui-icon helmet-slot" />
        <IconButton icon="chevron-right" />
      </div>
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
          onClick={() => createCharacter(assignedPoints)}
        />
      </div>
    </RpgContainer>
  )
}

export default NewCharacter
