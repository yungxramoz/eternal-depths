import React, { useState } from 'react'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import Encounter from '../../models/Encounter'
import './Dungeon.css'
import RpgProgressBar from '../../components/atoms/RpgProgressBar/RpgProgressBar'
import HpProgressBar from '../../components/molecules/ProgressBar/HpProgressBar'

const Dungeon = () => {
  let [encounter, setEncounter] = useState(new Encounter(1))

  const regenerateEncounter = () => {
    const randomLevel = Math.floor(Math.random() * 10) + 1
    const isBoss = Math.random() < 0.5
    setEncounter(new Encounter(randomLevel, isBoss))
  }
  let imgSrc = require('../../assets/images/encounters/' + encounter.fileName)

  let randomRoomType = Math.random() < 0.5 ? 'dungeon' : 'cave'
  let randomDungeonRoom = require(`../../assets/images/rooms/${randomRoomType}-${Math.floor(
    Math.random() * 5,
  )}.png`)

  return (
    <RpgContainer fullPage bgImg={randomDungeonRoom}>
      <h1>
        {encounter.name} Lvl {encounter.level}
      </h1>
      <h3>Stage: 1</h3>
      <HpProgressBar currentHp={encounter.hp-10} maxHp={encounter.maxHp} />
      <div className="encounter-container">
        <img
          className="encounter-img"
          src={imgSrc}
          alt={encounter.name}
          style={encounter.style}
        />
      </div>
      <RpgButton text="Regenerate" onClick={regenerateEncounter} />
    </RpgContainer>
  )
}

export default Dungeon
