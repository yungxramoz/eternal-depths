import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgIcon from '../../components/atoms/RpgIcon/RpgIcon'
import { RPGUI_ICON } from '../../constants/rpgui-icon'
import { createLeaderboardEntry } from '../../services/leaderboard-service'
import { gameReset } from '../../store/game/gameSlice'
import './Won.css'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'

const Won = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)
  const character = useSelector((state) => state.game.character.current)
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(false)

  const saveScore = async () => {
    setDisabled(true)
    await createLeaderboardEntry(name, stage, character)
    resetGame()
    setDisabled(false)
  }

  const resetGame = () => {
    dispatch(gameReset())
  }

  const isSaveDisabled = () => {
    return !name || disabled
  }

  return (
    <RpgContainer fullPage scrollable>
      <div className="won-container">
        <h2>Victorious Escape!</h2>
        <h3>Stage {stage}</h3>
        <RpgIcon icon={RPGUI_ICON.SKULL} />
        <p>
          You've emerged from the dungeon's darkness, your tales of bravery
          spreading far and wide. As a hero celebrated in story and song, carve
          your name into history.
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <RpgButton
          text="Save"
          onClick={saveScore}
          disabled={isSaveDisabled()}
        />
        <RpgButton text="End" onClick={resetGame} disabled={disabled} />
      </div>
    </RpgContainer>
  )
}

export default Won
