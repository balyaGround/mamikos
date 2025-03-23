import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import StarRating from './StarRating'; // Komponen bintang rating
import '../styles/PemilikKosModal.css';

const PemilikKosModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nama_tempat: '',
    kebersihan: 1, // Default 1 bintang
    keamanan: false, // Apakah ada satpam?
    jarak_dari_kampus: 1, // Default 1 km
    harga_sewa: 0,
    fasilitas: [],
    foto: ''
  });

  const fasilitasOptions = ['Kamar Mandi Dalam', 'Kipas', 'AC', 'WiFi', 'Laundry', 'Parkir'];

  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name === 'foto') {
      setFormData({ ...formData, foto: e.target.files[0] });
    } else if (type === 'checkbox' && name === 'keamanan') {
      setFormData({ ...formData, keamanan: checked });
    } else if (type === 'checkbox' && name === 'fasilitas') {
      const updatedFasilitas = checked
        ? [...formData.fasilitas, value]
        : formData.fasilitas.filter((item) => item !== value);
      setFormData({ ...formData, fasilitas: updatedFasilitas });
    } else if (name === 'harga_sewa') {
      setFormData({ ...formData, harga_sewa: Number(value) }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.foto) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const docData = { ...formData, foto: reader.result };
          await addDoc(collection(db, 'akun_pemilik_kos'), docData);
          alert('Data berhasil ditambahkan!');
          handleClose();
        };
        reader.readAsDataURL(formData.foto);
      } else {
        await addDoc(collection(db, 'akun_pemilik_kos'), formData);
        alert('Data berhasil ditambahkan!');
        handleClose();
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Gagal menambahkan data.');
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
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nama Tempat</Form.Label>
            <Form.Control type="text" name="nama_tempat" value={formData.nama_tempat} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Kebersihan</Form.Label>
            <StarRating rating={formData.kebersihan} onChange={(value) => setFormData({ ...formData, kebersihan: value })} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Keamanan</Form.Label>
            <Form.Check type="checkbox" name="keamanan" label="Ada Satpam" checked={formData.keamanan} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Jarak dari Kampus: {formData.jarak_dari_kampus} km</Form.Label>
            <Form.Range name="jarak_dari_kampus" value={formData.jarak_dari_kampus} min="0.1" max="5" step="0.1" onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Harga Sewa</Form.Label>
            <Form.Control type="number" name="harga_sewa" value={formData.harga_sewa} onChange={handleChange} min="100000" max="10000000" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Fasilitas</Form.Label>
            {fasilitasOptions.map((option) => (
              <Form.Check key={option} type="checkbox" name="fasilitas" value={option} label={option} checked={formData.fasilitas.includes(option)} onChange={handleChange} />
            ))}
          </Form.Group>

          <Form.Group>
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" accept="image/*" name="foto" onChange={handleChange} />
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
