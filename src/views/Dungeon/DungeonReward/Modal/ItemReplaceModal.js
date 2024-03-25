import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../../components/atoms/RpgButton/RpgButton'
import Modal from '../../../../components/organisms/Modal/Modal'
import { characterEquipItem } from '../../../../store/game/gameSlice'
import ItemDetails from '../../../../components/molecules/ItemDetails/ItemDetails'
import RpgSeparator from '../../../../components/templates/RpgSeperator/RpgSeparator'
import { getItemStats } from '../../../../utils/item-generator'

const ItemReplaceModal = ({ newItem, onClose, onRewardSelected }) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.game.character.current.items)
  const currentItem = items[newItem.type]

  const itemStats = (item) => getItemStats(item)

  const handleReplace = () => {
    dispatch(characterEquipItem(newItem))
    onRewardSelected()
  }

  return (
    <Modal
      title="Replace Item"
      onDismiss={onClose}
      content={
        <div className="item-replace-modal">
          <p>Do you want to replace the current item:</p>
          <ItemDetails
            title={currentItem.name}
            subtitle={currentItem.rarity}
            description={itemStats(currentItem)}
            icon={currentItem.icon}
          />
          <RpgSeparator />
          <p>New item:</p>
          <ItemDetails
            title={newItem.name}
            subtitle={newItem.rarity}
            description={itemStats(newItem)}
            icon={newItem.icon}
          />
        </div>
      }
      footerContent={<RpgButton text="Replace" onClick={handleReplace} />}
    />
  )
}

export default ItemReplaceModal
