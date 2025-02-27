// components/AddUserModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserPencariKosModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Add a new document to Firestore in the akun_pencari_kos collection
      await addDoc(collection(db, 'akun_pencari_kos'), {
        email: email,
        password: password,
      });
      // Reset the form and close the modal on success
      setEmail('');
      setPassword('');
      handleClose();
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Error adding user. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Pencari Kos Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddUser}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <Button variant="success" type="submit" className="w-100">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserPencariKosModal;
