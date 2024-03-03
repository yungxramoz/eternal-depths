import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../molecules/IconButton/IconButton'

const GoBackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <IconButton
      className="align-self-start"
      icon="arrow-left"
      size="large"
      onClick={goBack}
    />
  )
}

export default GoBackButton
