import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import './WarningModal.css';

function WarningModal({ show, setShow }) {
  const check = ({ isActive }) => isActive ? 'active-link-to-auth' : 'link-to-auth';

  return (
    <Modal show={show} onHide={() => setShow(false)} className="soundSpot__warning-modal">
      <Modal.Header closeButton>
        <Modal.Title className="warn-modal-title">
          Sign Up or Sign In to continue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="warn-modal-body">
        <NavLink to="/signup" className={check}>Sign Up</NavLink>
        <NavLink className={check} to="/signin">Sign In</NavLink>
      </Modal.Body>
    </Modal>
  );
}

export default WarningModal;
