import React from 'react'
import CharacterImg from '../../atoms/CharacterImg/CharacterImg'
import './CharacterAvatar.css'

const CharacterAvatar = ({ look, small = true }) => {
  return (
    <CharacterImg className="character-avatar" number={look} small={small} />
  )
}

export default CharacterAvatar
