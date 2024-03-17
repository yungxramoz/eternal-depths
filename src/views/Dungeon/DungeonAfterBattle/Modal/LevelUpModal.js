import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../components/organisms/Modal/Modal'
import RewardButton from '../../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../../constants/rpgui-icon'
import { learnAttack } from '../../../../store/character/characterSlice'
import './RewardModal.css'
import { generateAttack } from '../../../../utils/attack'

const LevelUpModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const characterLevel = useSelector((state) => state.character.current.level)
  const [attackReward] = useState(generateAttack())

  const selectAttackReward = () => {
    dispatch(learnAttack(attackReward))
    setIsOpen(false)
  }

  const selectStatReward = () => {
    console.log('Stat reward selected')
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <Modal title={`Level ${characterLevel} reached!`} dismissable={false}>
          <p>Choose your reward:</p>
          <div className="reward-selection-container">
            <RewardButton
              icon={attackReward.icon}
              title={attackReward.name}
              subtitle={`Cooldown: ${attackReward.cooldown}`}
              description={attackReward.description}
              onClick={selectAttackReward}
            ></RewardButton>
            <RpgSeparator golden />
            <RewardButton
              icon={RPGUI_ICON.POTION_RED}
              title="Attribute"
              description="Improve 2 attributes"
              onClick={selectStatReward}
            ></RewardButton>
          </div>
        </Modal>
      )}
    </>
  )
}

export default LevelUpModal
