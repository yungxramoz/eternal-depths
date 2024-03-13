import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import Modal from '../../../components/organisms/Modal/Modal'
import { equipItem, recoverHp } from '../../../store/character/characterSlice'
import { gameWon, nextStage } from '../../../store/game/gameSlice'
import { generateItem } from '../../../utils/item-generator'
import './DungeonAfterBattle.css'
import RewardButton from '../../../components/organisms/RewardButton/RewardButton'
import { RPGUI_ICON } from '../../../constants/rpgui-icon'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)
  const [gearReward] = useState(generateItem())
  const [hpReward] = useState(Math.floor(stage / 5) * 10 + 5) //TODO move to utils
  const [showReward, setShowReward] = useState(true)

  const gearIcon = useMemo(() => {
    switch (gearReward.type) {
      case 'sword':
        return RPGUI_ICON.SWORD
      case 'shield':
        return RPGUI_ICON.SHIELD
      case 'armor':
        return RPGUI_ICON.ARMOR_SLOT
      case 'helmet':
        return RPGUI_ICON.HELMET_SLOT
      case 'greaves':
        return RPGUI_ICON.SHOES_SLOT
      default:
        return RPGUI_ICON.EMPTY_SLOT
    }
  }, [gearReward.type])

  const itemStats = () => {
    return Object.entries(gearReward.stats)
      .filter(([key, value]) => value > 0)
      .map(([key, value]) => `${key.slice(0, 3).toUpperCase()}:${value}`)
      .join(', ')
  }

  const selectGear = () => {
    dispatch(equipItem(gearReward))
    setShowReward(false)
  }

  const selectHpRecovery = () => {
    dispatch(recoverHp(hpReward))
    setShowReward(false)
  }

  const localNextStage = () => {
    dispatch(nextStage())
    dispatch(recoverHp(15))
  }

  return (
    <>
      {showReward && (
        <Modal
          title="Encounter slayed!"
          dismissable={false}
          onClose={() => setShowReward(false)}
        >
          <p>Choose your reward:</p>
          <div className="reward-selection-container">
            <RewardButton
              icon={gearIcon}
              title={gearReward.name}
              subtitle={gearReward.rarity}
              description={itemStats()}
              onClick={() => selectGear()}
            ></RewardButton>

            <RewardButton
              icon={RPGUI_ICON.POTION_RED}
              title="HP Recovery"
              subtitle="Common"
              description={`Recover ${hpReward} HP`}
              onClick={() => selectHpRecovery()}
            ></RewardButton>
          </div>
        </Modal>
      )}
      <h1>Stage {stage}</h1>
      <div className="action-buttons-container">
        <RpgButton onClick={() => dispatch(gameWon())} text="Escape" />
        <RpgButton onClick={localNextStage} text="Next Stage" />
      </div>
    </>
  )
}

export default DungeonAfterBattle
