import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RewardButton from '../../../components/organisms/RewardButton/RewardButton'
import RpgSeparator from '../../../components/templates/RpgSeperator/RpgSeparator'
import {
  battleVictory,
  calculatedHpReward,
  characterEquipItem,
  characterRecoverHp,
} from '../../../store/game/gameSlice'
import { generateItem } from '../../../utils/item-generator'
import { RPGUI_ICON } from '../../../constants/rpgui-icon'
import RpgIcon from '../../../components/atoms/RpgIcon/RpgIcon'
import './DungeonReward.css'

const DungeonReward = () => {
  const dispatch = useDispatch()
  const hpReward = useSelector(calculatedHpReward)
  const level = useSelector((state) => state.game.character.current.level)
  const [gearReward] = useState(generateItem({ level }))

  const itemStats = () => {
    return Object.entries(gearReward.stats)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${key.slice(0, 3).toUpperCase()}:${value}`)
      .join(', ')
  }

  const selectGear = () => {
    dispatch(characterEquipItem(gearReward))
    dispatch(battleVictory())
  }

  const selectHpRecovery = () => {
    dispatch(characterRecoverHp(hpReward))
    dispatch(battleVictory())
  }

  return (
    <div className="reward-container">
      <h2>Encounter slayed!</h2>
      <RpgIcon icon={RPGUI_ICON.TREASURE} />
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
          icon={RPGUI_ICON.FOOD}
          title="Food"
          description={`Recover ${hpReward} HP`}
          onClick={selectHpRecovery}
        ></RewardButton>
      </div>
    </div>
  )
}

export default DungeonReward
