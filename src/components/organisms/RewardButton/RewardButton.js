import React from 'react'
import './RewardButton.css'
import GoldenButton from '../../molecules/GoldenButton/GoldenButton'
import ItemDetails from '../../molecules/ItemDetails/ItemDetails'

const RewardButton = ({
  onClick,
  disabled,
  icon,
  title,
  subtitle,
  description,
}) => {
  return (
    <GoldenButton
      className="reward-button"
      onClick={onClick}
      disabled={disabled}
    >
      <ItemDetails
        title={title}
        subtitle={subtitle}
        description={description}
        icon={icon}
      />
    </GoldenButton>
  )
}

export default RewardButton
