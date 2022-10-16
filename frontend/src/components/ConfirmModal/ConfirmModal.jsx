import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ConfirmModal.css';

function ConfirmModal({ show, setShow, deleteMusicFetch }) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="delete-modal-title">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="delete-modal-body">
        <div className="modal-button">
          <Button variant="outline-dark" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="danger" style={{ backgroundColor: '#BE1111' }} onClick={() => deleteMusicFetch()}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
