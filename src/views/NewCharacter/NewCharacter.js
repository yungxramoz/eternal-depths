import React from 'react'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../components/templates/RpgSeperator/RpgSeparator'
import Character from '../../models/Character'
import './NewCharacter.css'
import IconButton from '../../components/atoms/IconButton/IconButton'

const character = new Character()
let availableAttributePoints = 2

const NewCharacter = () => {
  return (
    <RpgContainer fullPage>
      <h1>New Character</h1>
      <RpgSeparator />
      <div className="look-container">
        <IconButton iconName="chevron-left" />
        <div className="rpgui-icon helmet-slot" />
        <IconButton iconName="chevron-right" />
      </div>
      <input type="text" placeholder="Name" value={character.name} />
      <RpgSeparator />
      <RpgContainer golden className="attribute-container">
        <h2>Attributes</h2>
        <p>Available points: {availableAttributePoints}</p>
        <RpgSeparator golden={false} />
        <div className="attribute">
          <p>Health</p>
          <p>- {character.health} +</p>
        </div>
        <div className="attribute">
          <p>Strength</p>
          <p>- {character.strength} +</p>
        </div>
        <div className="attribute">
          <p>Agility</p>
          <p>- {character.agility} +</p>
        </div>
        <div className="attribute">
          <p>Precision</p>
          <p>- {character.precision} +</p>
        </div>
      </RpgContainer>
      <div className='btn-container'>
        <RpgButton text="Create" />
      </div>
    </RpgContainer>
  )
}

export default NewCharacter
