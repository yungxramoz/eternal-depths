import React from 'react'
import RpgButton from '../../atoms/RpgButton/RpgButton'
import './ModalFooter.css'
import RpgSeparator from '../../templates/RpgSeperator/RpgSeparator'

const ModalFooter = ({ onClose, dismissable = true }) => (
  <div className="modal-footer">
    <RpgSeparator golden={false} />
    {dismissable && <RpgButton text="Close" onClick={onClose} />}
  </div>
)

export default ModalFooter
