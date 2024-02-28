import React, { useState } from 'react'
import './Dungeon.css'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
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

  let randomDungeonRoom = require(`../../assets/images/rooms/${randomRoomType}-${Math.floor(Math.random() * 5)}.png`)

  return (
    <RpgContainer fullPage bgImg={randomDungeonRoom}>
      <h1>{encounter.name}</h1>
      <p>Level: {encounter.level}</p>
      <p>
        Health: {encounter.hp}/{encounter.maxHp}
      </p>
      <p>Strength: {encounter.stats.strength}</p>
      <p>Agility: {encounter.stats.agility}</p>
      <p>Precision: {encounter.stats.precision}</p>
      <RpgButton text="Regenerate" onClick={regenerateEncounter} />
      <img className='encounter-img pt-5 pl-2' src={imgSrc} alt={encounter.name} />
    </RpgContainer>
  )
}

export default Dungeon
