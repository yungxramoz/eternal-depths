import React from 'react'
import './RewardButton.css'
import GoldenButton from '../../molecules/GoldenButton/GoldenButton'
import RpgIcon from '../../atoms/RpgIcon/RpgIcon'

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
      <div className="reward-button-container">
        <RpgIcon icon={icon} />
        <div className="reward-button-content">
          <p className="reward-title">{title}</p>
          <p className="reward-subtitle">
            <i>{subtitle}</i>
          </p>
          <p className="reward-description">{description}</p>
        </div>
      </div>
    </GoldenButton>
  )
}

export default RewardButton
