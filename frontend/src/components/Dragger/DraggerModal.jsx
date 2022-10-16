import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DraggerModal({ handleClose, confirmCase }) {
  return (
    <Modal
      show
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Setting new location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Press Yes for enter
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmCase}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DraggerModal;
