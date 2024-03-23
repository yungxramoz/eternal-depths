import React from 'react'
import ModalBody from '../../molecules/ModalBody/ModalBody'
import ModalFooter from '../../molecules/ModalFooter/ModalFooter'
import ModalHeader from '../../molecules/ModalHeader/ModalHeader'
import './Modal.css'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'

const Modal = ({ title, content, footerContent }) => {
  return (
    <div className="modal-container">
      <RpgContainer golden className="modal">
        <ModalHeader title={title} />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </RpgContainer>
      <div className="modal-background" />
    </div>
  )
}

export default Modal
