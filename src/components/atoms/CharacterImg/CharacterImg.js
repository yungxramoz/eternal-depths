import React from 'react'
import './CharacterImg.css'

const CharacterImg = ({ number, className = '', small = false }) => {
  const classes = small ? `character-img-small ${className}` : className
  const getCharacterImage = () => {
    const context = require.context(
      '../../../assets/images/characters',
      false,
      /\.(png|jpe?g|svg)$/,
    )
    const images = context.keys().map(context)
    return images[number]
  }

  const characterImage = getCharacterImage()

  return (
    <img
      className={`character-img ${classes}`}
      src={characterImage}
      alt={`Character ${number}`}
    />
  )
}

export default CharacterImg
