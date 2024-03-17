import React from 'react'
import { useSelector } from 'react-redux'
import CharacterHeader from '../../components/organisms/CharacterHeader/CharacterHeader'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import { characterMaxHp, characterMaxXp } from '../../store/game/gameSlice'
import './Dungeon.css'
import DungeonAfterBattle from './DungeonAfterBattle/DungeonAfterBattle'
import DungeonBeforeBattle from './DungeonBeforeBattle/DungeonBeforeBattle'
import DungeonInBattle from './DungeonInBattle/DungeonInBattle'
import DungeonLevelUp from './DungeonLevelUp/DungeonLevelUp'

const Dungeon = () => {
  const stageFileName = useSelector(
    (state) => state.game.encounter.stageFileName,
  )
  const gameCycleState = useSelector((state) => state.game.gameCycleState)
  const stage = useSelector((state) => state.game.stage)
  const character = useSelector((state) => state.game.character.current)
  const charMaxHp = useSelector(characterMaxHp)
  const charMaxXp = useSelector(characterMaxXp)

  let stageImgSrc = require('../../assets/images/rooms/' + stageFileName)

  const renderContent = () => {
    switch (gameCycleState) {
      case GAME_CYCLE_STATE.ENCOUNTER:
        return <DungeonBeforeBattle />
      case GAME_CYCLE_STATE.BATTLE:
        return <DungeonInBattle />
      case GAME_CYCLE_STATE.BATTLE_VICTORY:
        return <DungeonAfterBattle />
      case GAME_CYCLE_STATE.BATTLE_DEFEAT:
        return <></>
      case GAME_CYCLE_STATE.LEVEL_UP:
        return <DungeonLevelUp />
      default:
        return <></>
    }
  }
  const renderCharacterHeader = () => {
    switch (gameCycleState) {
      case GAME_CYCLE_STATE.BATTLE_VICTORY:
      case GAME_CYCLE_STATE.LEVEL_UP:
      case GAME_CYCLE_STATE.ENCOUNTER:
        return (
          <>
            <h2>Stage {stage}</h2>
            <CharacterHeader
              character={character}
              maxHp={charMaxHp}
              maxXp={charMaxXp}
            />
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <RpgContainer
      className="dungeon-container"
      bgImg={stageImgSrc}
      fullPage
      scrollable
    >
      {renderCharacterHeader()}
      {renderContent()}
    </RpgContainer>
  )
}

export default Dungeon
