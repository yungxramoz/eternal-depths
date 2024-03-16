import React from 'react'
import './ModalHeader.css'
import RpgSeparator from '../../templates/RpgSeperator/RpgSeparator'

const ModalHeader = ({ title }) => (
  <div className="modal-header">
    <h2>{title}</h2>
    <RpgSeparator golden={false} />
  </div>
)

export default ModalHeader
