import React, { useState } from 'react'
import './Dungeon.css'
import Encounter from '../../models/Encounter'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'

const Dungeon = () => {
  let [encounter, setEncounter] = useState(new Encounter(1))

  const regenerateEncounter = () => {
    const randomLevel = Math.floor(Math.random() * 10) + 1
    const isBoss = Math.random() < 0.5
    setEncounter(new Encounter(randomLevel, isBoss))
  }
  let imgSrc = require('../../assets/images/encounters/' + encounter.fileName)

  //get random dungeon or cave string
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
      <div className="d-flex justify-content-center">
        <img
          className="encounter-img"
          src={imgSrc}
          alt={encounter.name}
          style={encounter.style}
        />
      </div>
    </RpgContainer>
  )
}

export default Dungeon
