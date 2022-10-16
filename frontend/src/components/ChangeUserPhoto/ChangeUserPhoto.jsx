import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ChangeUserPhoto({ show, setShow }) {
  const { data: user } = useSelector((state) => state.authState);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Change photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action={`/user/${user.id}/photo`} onSubmit={() => {}} encType="multipart/form-data" method="POST">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose file for upload</Form.Label>
            <Form.Control type="file" name="photo" />
          </Form.Group>
          <Button variant="danger" style={{ backgroundColor: '#BE1111' }} type="submit">
            Change photo
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeUserPhoto;
