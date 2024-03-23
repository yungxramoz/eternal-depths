import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import EditStatsPanel from '../../../components/organisms/EditStatsPanel/EditStatsPanel'
import RewardButton from '../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../constants/rpgui-icon'
import {
  battleVictory,
  characterAssignAttributePoint,
  characterLearnAttack,
  characterSetAssignablePoints,
} from '../../../store/game/gameSlice'
import { generateAttack } from '../../../utils/attack'
import './DungeonLevelUp.css'
import AttackReplaceModal from './Modal/AttackReplaceModal'

const DungeonLevelUp = () => {
  const dispatch = useDispatch()
  const characterLevel = useSelector(
    (state) => state.game.character.current.level,
  )
  const characterAttacks = useSelector(
    (state) => state.game.character.current.attacks,
  )
  const [assignedPoints, setAssignedPoints] = useState({
    health: 0,
    strength: 0,
    agility: 0,
    precision: 0,
  })
  const [replaceAttackModal, setReplaceAttackModal] = useState(false)
  const availablePoints = useSelector(
    (state) => state.game.character.availableAttributePoints,
  )
  const characterStats = useSelector(
    (state) => state.game.character.current.stats,
  )
  const [attackReward] = useState(generateAttack())
  const [statRewardChoice, setStatRewardChoice] = useState(false)

  const selectAttackReward = () => {
    if (characterAttacks.length >= 3) {
      setReplaceAttackModal(true)
      return
    }
    dispatch(characterLearnAttack(attackReward))
    rewardSelected()
  }

  const selectStatReward = () => {
    dispatch(characterSetAssignablePoints(2))
    setStatRewardChoice(true)
  }

  const assignPoints = () => {
    dispatch(characterAssignAttributePoint(assignedPoints))
    rewardSelected()
  }

  const isAssignDisabled = () => {
    return (
      Object.values(assignedPoints).reduce((a, b) => a + b, 0) !==
      availablePoints
    )
  }

  const rewardSelected = () => {
    dispatch(battleVictory())
  }

  const getContent = () => {
    if (statRewardChoice) {
      return (
        <>
          <EditStatsPanel
            stats={characterStats}
            initialPoints={availablePoints}
            assignedPoints={assignedPoints}
            setAssignedPoints={setAssignedPoints}
            grey
          />
          <RpgSeparator golden={false} />
          <RpgButton
            text="Assign"
            onClick={assignPoints}
            disabled={isAssignDisabled()}
          />
        </>
      )
    }
    return (
      <>
        <p>Choose your reward:</p>
        <div className="reward-selection-container">
          <RewardButton
            icon={RPGUI_ICON.BOOK}
            title={attackReward.name}
            subtitle={`Cooldown: ${attackReward.cooldown}`}
            description={attackReward.description}
            onClick={selectAttackReward}
          ></RewardButton>
          <RpgSeparator golden />
          <RewardButton
            icon={RPGUI_ICON.POTION}
            title="Attribute"
            description="Improve 2 attributes"
            onClick={selectStatReward}
          ></RewardButton>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="levelup-container">
        <h2>Level {characterLevel} reached!</h2>
        {getContent()}
      </div>
      {replaceAttackModal && (
        <AttackReplaceModal
          newAttack={attackReward}
          onClose={() => setReplaceAttackModal(false)}
          onRewardSelected={rewardSelected}
        />
      )}
    </>
  )
}

export default DungeonLevelUp
