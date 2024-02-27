import React from 'react'
import './CharacterImg.css'

const CharacterImg = ({ number }) => {
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

  return <img src={characterImage} alt={`Character ${number}`} />
}

export default CharacterImg
