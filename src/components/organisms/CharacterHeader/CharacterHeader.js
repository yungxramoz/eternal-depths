import React from 'react'
import CharacterAvatar from '../../molecules/CharacterAvatar/CharacterAvatar'
import HpLightProgressBar from '../../molecules/ProgressBar/HpLightProgressBar'
import XpLightProgressBar from '../../molecules/ProgressBar/XpLightProgressBar'
import './CharacterHeader.css'

const CharacterHeader = ({ character, maxHp, maxXp }) => {
  return (
    <div className="character-information">
      <CharacterAvatar look={character.look} />
      <div className="character-stats">
        <HpLightProgressBar currentHp={character.hp} maxHp={maxHp} />
        <XpLightProgressBar
          currentLvl={character.level}
          currentXp={character.xp}
          maxXp={maxXp}
        />
      </div>
    </div>
  )
}

export default CharacterHeader
