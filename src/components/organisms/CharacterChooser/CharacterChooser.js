import React, { useState, useEffect } from 'react'
import IconButton from '../../molecules/IconButton/IconButton'
import './CharacterChooser.css'
import CharacterImg from '../../molecules/CharacterImg/CharacterImg'

const CharacterChooser = ({ onCharacterChange }) => {
  const handlePreviousCharacter = () => {
    setCurrentCharacter((prevCharacter) =>
      prevCharacter === 0 ? characterCount - 1 : prevCharacter - 1,
    )
  }

  const handleNextCharacter = () => {
    setCurrentCharacter((prevCharacter) =>
      prevCharacter === characterCount - 1 ? 0 : prevCharacter + 1,
    )
  }

  const getCharacterCount = () => {
    const context = require.context(
      '../../../assets/images/characters',
      false,
      /\.(png|jpe?g|svg)$/,
    )
    return context.keys().length
  }

  const [currentCharacter, setCurrentCharacter] = useState(0)
  const characterCount = getCharacterCount()

  useEffect(() => {
    onCharacterChange(currentCharacter)
  }, [currentCharacter, onCharacterChange])

  return (
    <div className="look-container">
      <IconButton icon="chevron-left" onClick={handlePreviousCharacter} />
      <CharacterImg number={currentCharacter} />
      <IconButton icon="chevron-right" onClick={handleNextCharacter} />
    </div>
  )
}

export default CharacterChooser
