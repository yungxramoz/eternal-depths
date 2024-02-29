import React from 'react'
import ArrowLeftIcon from '../../atoms/Icons/ArrowLeftIcon'
import ChevronLeftIcon from '../../atoms/Icons/ChevronLeftIcon'
import ChevronRightIcon from '../../atoms/Icons/ChevronRightIcon'
import MinusIcon from '../../atoms/Icons/MinusIcon'
import PlusIcon from '../../atoms/Icons/PlusIcon'
import './IconButton.css'

const IconButton = ({ icon, size, disabled, className, onClick }) => {
  return (
    <button
      className={`icon-button ${getSizeClass(size)} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {getIcon(icon)}
    </button>
  )
}

const getSizeClass = (size) => {
  switch (size) {
    case 'small':
      return 'small'
    case 'medium':
      return 'medium'
    case 'large':
      return 'large'
    default:
      return ''
  }
}

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
    default:
      return null
  }
}

export default IconButton
