import Modal from 'react-bootstrap/Modal';
import React from 'react';
// import { useSelector } from 'react-redux';
import './CreateBand.css';

// const { data: user } = useSelector((state) => state.authState);

function CreateBand() {
  return (
    <Modal
      // onHide={onHide}
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Band
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form-create-band">
          <input type="text" placeholder="add band name" />
          <input type="text" placeholder="add information about band" />
          <input type="text" placeholder="add photo" />
          <input type="text" placeholder="add band genres" />
          <input type="text" placeholder="add band members" />
          <button type="submit">Create Band</button>
        </form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default CreateBand;
