import React from 'react'
import ModalBody from '../../molecules/ModalBody/ModalBody'
import ModalFooter from '../../molecules/ModalFooter/ModalFooter'
import ModalHeader from '../../molecules/ModalHeader/ModalHeader'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'
import './Modal.css'

const Modal = ({
  title,
  content,
  footerContent,
  onDismiss,
  dismissible = true,
}) => {
  return (
    <div className="modal-container">
      <RpgContainer golden className="modal">
        <ModalHeader
          title={title}
          dismissible={dismissible}
          onDismiss={onDismiss}
        />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </RpgContainer>
      <div className="modal-background" />
    </div>
  )
}

export default Modal
