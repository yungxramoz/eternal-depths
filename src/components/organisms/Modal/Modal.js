import React from 'react'
import ModalBody from '../../molecules/ModalBody/ModalBody'
import ModalFooter from '../../molecules/ModalFooter/ModalFooter'
import ModalHeader from '../../molecules/ModalHeader/ModalHeader'
import './Modal.css'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'

const Modal = ({
  title,
  children,
  onClose,
  dismissable = true,
  noFooter = false,
}) => {
  if (onClose === undefined) {
    onClose = () => {}
  }

  return (
    <div className="modal-container">
      <RpgContainer golden className="modal">
        <ModalHeader title={title} />
        <ModalBody>{children}</ModalBody>
        {!noFooter && (
          <ModalFooter onClose={onClose} dismissable={dismissable} />
        )}
      </RpgContainer>
      <div className="modal-background" />
    </div>
  )
}

export default Modal
