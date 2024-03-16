import React from 'react'
import './GoldenButton.css'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'

const GoldenButton = ({ children, onClick, disabled, className = '' }) => {
  return (
    <button
      className={`golden-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <RpgContainer golden2 className="golden-container">
        {children}
      </RpgContainer>
    </button>
  )
}

export default GoldenButton
