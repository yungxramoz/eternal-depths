import React from 'react'
import './ModalFooter.css'
import RpgSeparator from '../../templates/RpgSeperator/RpgSeparator'

const ModalFooter = ({ children }) => (
  <div className="modal-footer">
    <RpgSeparator golden={false} />
    {children}
  </div>
)

export default ModalFooter
