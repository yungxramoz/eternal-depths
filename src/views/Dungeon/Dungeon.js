import React from 'react'
import { useSelector } from 'react-redux'
import Encounter from '../../components/molecules/Encounter/Encounter'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import './Dungeon.css'
import DungeonBeforeBattle from './DungeonBeforeBattle'
import DungeonInBattle from './DungeonInBattle'
import DungeonAfterBattle from './DungeonAfterBattle'

const Dungeon = () => {
  const encounter = useSelector((state) => state.game.encounter)
  const stageFileName = useSelector((state) => state.game.stageFileName)
  const gameCycleState = useSelector((state) => state.game.gameCycleState)
  const encounterAnimationState = useSelector(
    (state) => state.game.encounterAnimation,
  )

  let stageImgSrc = require('../../assets/images/rooms/' + stageFileName)

  const renderContent = () => {
    switch (gameCycleState) {
      case GAME_CYCLE_STATE.ENCOUNTER:
        return (
          <DungeonBeforeBattle>
            <Encounter encounter={encounter} />
          </DungeonBeforeBattle>
        )
      case GAME_CYCLE_STATE.BATTLE:
        return (
          <DungeonInBattle>
            <Encounter
              encounterAnimationState={encounterAnimationState}
              encounter={encounter}
              showHp
            />
          </DungeonInBattle>
        )
      case GAME_CYCLE_STATE.BATTLE_VICTORY:
        return <DungeonAfterBattle />
      case GAME_CYCLE_STATE.BATTLE_DEFEAT:
        return <></>
      case GAME_CYCLE_STATE.LEVEL_UP:
        return <></>
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
      {renderContent()}
    </RpgContainer>
  )
}

export default Dungeon
