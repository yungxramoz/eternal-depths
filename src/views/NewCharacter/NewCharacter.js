import React from 'react'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../components/templates/RpgSeperator/RpgSeparator'
import './NewCharacter.css'
import IconButton from '../../components/molecules/IconButton/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { assignAttributePoint } from '../../state/character/characterSlice'

const NewCharacter = () => {
  const character = useSelector((state) => state.character.current)
  const availableAttributePoints = useSelector(
    (state) => state.character.availableAttributePoints,
  )

  const dispatch = useDispatch()

  return (
    <RpgContainer fullPage>
      <h1>New Character</h1>
      <RpgSeparator />
      <div className="look-container">
        <IconButton icon="chevron-left" />
        <div className="rpgui-icon helmet-slot" />
        <IconButton icon="chevron-right" />
      </div>
      <input type="text" placeholder="Name" value={character.name} />
      <RpgSeparator />
      <RpgContainer golden className="attribute-container">
        <h2>Attributes</h2>
        <p>Available points: {availableAttributePoints}</p>
        <RpgSeparator golden={false} />
        <div className="attribute">
          <p>Health</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('health'))}
            />
            <p>{character.health}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('health'))}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Strength</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('strength'))}
            />
            <p>{character.strength}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('strength'))}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Agility</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('agility'))}
            />
            <p>{character.agility}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('agility'))}
            />
          </div>
        </div>
        <div className="attribute">
          <p>Precision</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('precision'))}
            />
            <p>{character.precision}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => dispatch(assignAttributePoint('precision'))}
            />
          </div>
        </div>
      </RpgContainer>
      <div className="btn-container">
        <RpgButton text="Create" />
      </div>
    </RpgContainer>
  )
}

export default NewCharacter
