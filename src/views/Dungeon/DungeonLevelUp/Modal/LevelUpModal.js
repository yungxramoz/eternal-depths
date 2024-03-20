import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../components/organisms/Modal/Modal'
import RewardButton from '../../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../../constants/rpgui-icon'
import './LevelUpModal.css'
import { generateAttack } from '../../../../utils/attack'
import { characterLearnAttack } from '../../../../store/game/gameSlice'

const LevelUpModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const characterLevel = useSelector(
    (state) => state.game.character.current.level,
  )
  const characterAttacks = useSelector(
    (state) => state.game.character.current.attacks,
  )
  const [attackReward] = useState(generateAttack())

  const selectAttackReward = () => {
    dispatch(characterLearnAttack(attackReward))
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
        </Modal>
      )}
    </>
  )
}

export default LevelUpModal
