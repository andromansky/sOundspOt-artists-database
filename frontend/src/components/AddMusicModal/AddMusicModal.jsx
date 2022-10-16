import React from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddMusicModal({ show, setShow }) {
  const { data: user } = useSelector((state) => state.authState);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add music</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action={`/user/${user.id}/music`} onSubmit={() => {}} encType="multipart/form-data" method="POST">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label><h5>Enter song title</h5></Form.Label>
            <Form.Control type="text" name="songname" />
            <Form.Label><h5>Choose file for upload</h5></Form.Label>
            <Form.Control type="file" name="song" />
          </Form.Group>
          <Button variant="danger" style={{ backgroundColor: '#BE1111' }} type="submit">
            Add demo
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMusicModal;
