// components/PemilikKosModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const PemilikKosModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nama_tempat: '',
    kebersihan: 1,
    keamanan: 1,
    jarak_dari_kampus: 0.1,
    harga_sewa: 100000,
    fasilitas: 1,
    foto: ''
  });

  const db = getFirestore(); // Initialize Firestore instance

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'foto' ? e.target.files[0] : value, // Set file input for photo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert photo to base64 if a file is selected
      if (formData.foto) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result;
          const docData = { ...formData, foto: base64String };

          // Add document to Firestore
          await addDoc(collection(db, 'akun_pemilik_kos'), docData);
          alert('Data successfully added!');
          handleClose(); // Close modal after successful submission
        };
        reader.readAsDataURL(formData.foto); // Read file as data URL
      } else {
        // If no photo is selected, add other fields
        await addDoc(collection(db, 'akun_pemilik_kos'), formData);
        alert('Data successfully added!');
        handleClose();
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add data. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register Pemilik Kos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nama Tempat</Form.Label>
            <Form.Control
              type="text"
              name="nama_tempat"
              value={formData.nama_tempat}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kebersihan (1-10)</Form.Label>
            <Form.Control
              type="number"
              name="kebersihan"
              value={formData.kebersihan}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Keamanan (1-10)</Form.Label>
            <Form.Control
              type="number"
              name="keamanan"
              value={formData.keamanan}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Jarak dari Kampus (0.1-5 km)</Form.Label>
            <Form.Control
              type="number"
              name="jarak_dari_kampus"
              value={formData.jarak_dari_kampus}
              onChange={handleChange}
              step="0.1"
              min="0.1"
              max="5"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga Sewa (100,000 - 10,000,000)</Form.Label>
            <Form.Control
              type="number"
              name="harga_sewa"
              value={formData.harga_sewa}
              onChange={handleChange}
              min="100000"
              max="10000000"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fasilitas (1-10)</Form.Label>
            <Form.Control
              type="number"
              name="fasilitas"
              value={formData.fasilitas}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Foto (Base64 Image)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="foto"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3 w-100">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PemilikKosModal;
