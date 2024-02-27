import React, { useMemo, useState } from 'react'
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

const NewCharacter = () => {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character.current)
  const [points, setPoints] = useState(
    structuredClone(
      useSelector((state) => state.character.availableAttributePoints),
    ),
  )
  const [assignedPoints, setAssignedPoints] = useState({
    health: 0,
    strength: 0,
    agility: 0,
    precision: 0,
  })
  const [localName, setLocalName] = useState(character.name)

  const localStats = useMemo(() => {
    return {
      health: character.health + assignedPoints.health,
      strength: character.strength + assignedPoints.strength,
      agility: character.agility + assignedPoints.agility,
      precision: character.precision + assignedPoints.precision,
    }
  })

  const updateStats = (stat, value) => {
    if (value < 0 && assignedPoints[stat] === 0) return
    if (value > 0 && points === 0) return
    setAssignedPoints({
      ...assignedPoints,
      [stat]: assignedPoints[stat] + value,
    })
    setPoints(points - value)
  }

  const createCharacter = () => {
    dispatch(setName(localName))
    dispatch(assignAttributePoint(assignedPoints))
    resetLocalFields()
  }

  const resetLocalFields = () => {
    setLocalName('')
    setAssignedPoints({
      strength: 0,
      health: 0,
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
      <RpgContainer golden className="attribute-container">
        <h2>Attributes</h2>
        <p>Available points: {points}</p>
        <RpgSeparator golden={false} />
        <div className="attribute">
          <p>Health</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => updateStats('health', -1)}
            />
            <p>{localStats.health}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => updateStats('health', 1)}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Strength</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => updateStats('strength', -1)}
            />
            <p>{localStats.strength}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => updateStats('strength', 1)}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Agility</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => updateStats('agility', -1)}
            />
            <p>{localStats.agility}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => updateStats('agility', 1)}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Precision</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => updateStats('precision', -1)}
            />
            <p>{localStats.precision}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => updateStats('precision', 1)}
            />
          </div>
        </div>
      </RpgContainer>
      <div className="btn-container">
        <RpgButton text="Create" onClick={createCharacter} />
      </div>
    </RpgContainer>
  )
}

export default NewCharacter
