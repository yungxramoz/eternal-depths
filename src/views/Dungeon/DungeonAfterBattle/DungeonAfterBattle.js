import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../components/atoms/RpgButton/RpgButton'
import Modal from '../../../components/organisms/Modal/Modal'
import RewardButton from '../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../components/templates/RpgSeperator/RpgSeparator'
import { RPGUI_ICON } from '../../../constants/rpgui-icon'
import { equipItem, recoverHp } from '../../../store/character/characterSlice'
import { gameWon, nextStage } from '../../../store/game/gameSlice'
import { generateItem } from '../../../utils/item-generator'
import './DungeonAfterBattle.css'

const DungeonAfterBattle = () => {
  const dispatch = useDispatch()
  const stage = useSelector((state) => state.game.stage)
  const [gearReward] = useState(generateItem())
  const [hpReward] = useState(Math.min(Math.floor(stage / 5) * 10 + 5, 50))
  const [showReward, setShowReward] = useState(true)

  const gearIcon = useMemo(() => {
    switch (gearReward.type) {
      case 'weapon':
        return RPGUI_ICON.SWORD
      case 'shield':
        return RPGUI_ICON.SHIELD
      case 'armor':
        return RPGUI_ICON.ARMOR
      case 'helmet':
        return RPGUI_ICON.HELMET
      case 'greaves':
        return RPGUI_ICON.SHOES
      default:
        return RPGUI_ICON.GLOVES
    }
  }, [gearReward.type])

  const itemStats = () => {
    return Object.entries(gearReward.stats)
      .filter(([_, value]) => value > 0)
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
            <RpgSeparator golden />
            <RewardButton
              icon={RPGUI_ICON.POTION_RED}
              title="HP Recovery"
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
