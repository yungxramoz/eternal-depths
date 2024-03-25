import React from 'react'
import RpgSeparator from '../../templates/RpgSeperator/RpgSeparator'
import IconButton from '../IconButton/IconButton'
import './ModalHeader.css'

const ModalHeader = ({ title, dismissible, onDismiss }) => (
  <div className="modal-header">
    {dismissible && (
      <IconButton
        className="dismiss-button"
        size="large"
        icon="close"
        onClick={onDismiss}
      />
    )}
    <h2>{title}</h2>
    <RpgSeparator golden={false} />
  </div>
)

export default ModalHeader
