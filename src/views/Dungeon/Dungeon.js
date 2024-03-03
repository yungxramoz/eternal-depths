import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import { nextStage } from '../../store/game/gameSlice'
import './Dungeon.css'

const Dungeon = () => {
  const dispatch = useDispatch()
  const encounter = useSelector((state) => state.game.encounter)
  const stage = useSelector((state) => state.game.stage)

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
      <h3>Stage: {stage}</h3>
      <div className="encounter-container">
        <img
          className="encounter-img"
          src={imgSrc}
          alt={encounter.name}
          style={encounter.style}
        />
      </div>
      <RpgButton text="Next Stage" onClick={() => dispatch(nextStage())} />
    </RpgContainer>
  )
}

export default Dungeon
