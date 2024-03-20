import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../components/organisms/Modal/Modal'
import RewardButton from '../../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../../constants/rpgui-icon'
import {
  characterAssignAttributePoint,
  characterLearnAttack,
  characterSetAssignablePoints,
} from '../../../../store/game/gameSlice'
import { generateAttack } from '../../../../utils/attack'
import './LevelUpModal.css'
import EditStatsPanel from '../../../../components/organisms/EditStatsPanel/EditStatsPanel'
import RpgButton from '../../../../components/atoms/RpgButton/RpgButton'

const LevelUpModal = ({ isOpen, setIsOpen }) => {
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
  const availablePoints = useSelector(
    (state) => state.game.character.availableAttributePoints,
  )
  const characterStats = useSelector(
    (state) => state.game.character.current.stats,
  )
  const [attackReward] = useState(generateAttack())
  const [statRewardChoice, setStatRewardChoice] = useState(false)

  const selectAttackReward = () => {
    dispatch(characterLearnAttack(attackReward))
    setIsOpen(false)
  }

  const selectStatReward = () => {
    dispatch(characterSetAssignablePoints(2))
    setStatRewardChoice(true)
  }

  const assignPoints = () => {
    dispatch(characterAssignAttributePoint(assignedPoints))
    setIsOpen(false)
  }

  const isAssignDisabled = () => {
    return (
      Object.values(assignedPoints).reduce((a, b) => a + b, 0) !==
      availablePoints
    )
  }

  const getModalContent = () => {
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
            disabled={characterAttacks.length >= 3}
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
      {isOpen && (
        <Modal title={`Level ${characterLevel} reached!`} dismissable={false}>
          {getModalContent()}
        </Modal>
      )}
    </>
  )
}

export default LevelUpModal
