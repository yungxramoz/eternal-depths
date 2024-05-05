import React from 'react'
import './ItemDetails.css'
import RpgIcon from '../../atoms/RpgIcon/RpgIcon'

const ItemDetails = ({ title, subtitle, description, icon }) => {
  return (
    <div className="item-container">
      {icon && <RpgIcon className="item-icon" icon={icon} />}
      <div className="item-content">
        <p className="item-title">{title}</p>
        <p className="item-subtitle">
          <i>{subtitle}</i>
        </p>
        <p className="item-description">{description}</p>
      </div>
    </div>
  )
}

export default ItemDetails
