import React from 'react'
import ArrowLeftIcon from '../../atoms/Icons/ArrowLeftIcon'
import ChevronLeftIcon from '../../atoms/Icons/ChevronLeftIcon'
import ChevronRightIcon from '../../atoms/Icons/ChevronRightIcon'
import MinusIcon from '../../atoms/Icons/MinusIcon'
import PlusIcon from '../../atoms/Icons/PlusIcon'
import './IconButton.css'
import CloseIcon from '../../atoms/Icons/CloseIcon'

const IconButton = ({ icon, disabled, onClick, size = '', className = '' }) => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'chevron-left':
        return <ChevronLeftIcon />
      case 'chevron-right':
        return <ChevronRightIcon />
      case 'arrow-left':
        return <ArrowLeftIcon />
      case 'minus':
        return <MinusIcon />
      case 'plus':
        return <PlusIcon />
      case 'close':
        return <CloseIcon />
      default:
        return null
    }
  }

  return (
    <button
      className={`icon-button ${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {getIcon(icon)}
    </button>
  )
}

export default IconButton
