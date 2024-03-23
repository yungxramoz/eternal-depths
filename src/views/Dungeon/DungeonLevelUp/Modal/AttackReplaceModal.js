import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RpgButton from '../../../../components/atoms/RpgButton/RpgButton'
import Modal from '../../../../components/organisms/Modal/Modal'
import { characterReplaceAttack } from '../../../../store/game/gameSlice'
import ItemRadioButton from '../../../../components/organisms/ItemRadioButton/ItemRadioButton'

const AttackReplaceModal = ({ newAttack, onClose, onRewardSelected }) => {
  const dispatch = useDispatch()
  const attacks = useSelector((state) => state.game.character.current.attacks)
  const [selectedAttackId, setSelectedAttackId] = useState(2)
  const filteredAttacks = attacks.filter((attack) => attack.id !== newAttack.id)

  const handleReplace = () => {
    dispatch(characterReplaceAttack({ newAttack, attackId: selectedAttackId }))
    onRewardSelected()
  }

  return (
    <Modal
      title="Replace Attack"
      content={
        <div className="attack-replace-modal">
          <p>Select an attack to replace:</p>
          <form className="attack-list">
            {filteredAttacks.map((attack) => (
              <ItemRadioButton
                key={attack.id}
                id={attack.id}
                checked={selectedAttackId === attack.id}
                title={attack.name}
                subtitle={`Cooldown: ${attack.cooldown}`}
                description={attack.description}
                onChange={() => setSelectedAttackId(attack.id)}
              />
            ))}
          </form>
        </div>
      }
      footerContent={
        <RpgButton
          text="Replace"
          disabled={selectedAttackId == null}
          onClick={handleReplace}
        />
      }
    />
  )
}

export default AttackReplaceModal
