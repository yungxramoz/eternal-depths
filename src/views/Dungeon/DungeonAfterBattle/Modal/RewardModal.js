import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../components/organisms/Modal/Modal'
import RewardButton from '../../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../../constants/rpgui-icon'
import {
  equipItem,
  recoverHp,
} from '../../../../store/character/characterSlice'
import { calculatedHpReward } from '../../../../store/game/gameSlice'
import { generateItem } from '../../../../utils/item-generator'
import './RewardModal.css'

const RewardModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const hpReward = useSelector(calculatedHpReward)
  const [gearReward] = useState(generateItem())

  const itemStats = () => {
    return Object.entries(gearReward.stats)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${key.slice(0, 3).toUpperCase()}:${value}`)
      .join(', ')
  }

  const selectGear = () => {
    dispatch(equipItem(gearReward))
    setIsOpen(false)
  }

  const selectHpRecovery = () => {
    dispatch(recoverHp(hpReward))
    setIsOpen(false)
  }
  return (
    <>
      {isOpen && (
        <Modal title="Encounter slayed!" dismissable={false}>
          <p>Choose your reward:</p>
          <div className="reward-selection-container">
            <RewardButton
              icon={gearReward.icon}
              title={gearReward.name}
              subtitle={gearReward.rarity}
              description={itemStats()}
              onClick={selectGear}
            ></RewardButton>
            <RpgSeparator golden />
            <RewardButton
              icon={RPGUI_ICON.POTION_RED}
              title="Food"
              description={`Recover ${hpReward} HP`}
              onClick={selectHpRecovery}
            ></RewardButton>
          </div>
        </Modal>
      )}
    </>
  )
}

export default RewardModal
