import React, { useState } from 'react'
import IconButton from '../../molecules/IconButton/IconButton'
import './CharacterChooser.css'

const CharacterChooser = ({ onCharacterChange }) => {

    const handlePreviousCharacter = () => {
        setCurrentCharacter((prevCharacter) =>
            prevCharacter === 0 ? characters.length - 1 : prevCharacter - 1,
        )
    }

    const handleNextCharacter = () => {
        setCurrentCharacter((prevCharacter) =>
            prevCharacter === characters.length - 1 ? 0 : prevCharacter + 1,
        )
    }

    const getCharacterImages = () => {
        const context = require.context(
            '../../../assets/images/characters',
            false,
            /\.(png|jpe?g|svg)$/,
        )
        const images = context.keys().map(context)
        return images
    }

    const [currentCharacter, setCurrentCharacter] = useState(0)
    const characters = getCharacterImages()

    // Call the onCharacterChange prop whenever the currentCharacter changes
    React.useEffect(() => {
        onCharacterChange(currentCharacter)
    }, [currentCharacter, onCharacterChange])

    return (
        <div className="look-container">
            <IconButton icon="chevron-left" onClick={handlePreviousCharacter} />
            <img className="character-img" src={characters[currentCharacter]} alt="Character" />
            <IconButton icon="chevron-right" onClick={handleNextCharacter} />
        </div>
    )
}

export default CharacterChooser
