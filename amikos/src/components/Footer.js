import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p className='text-success'>
              We provide the best platform to find your perfect rental house. Explore a wide
              range of rental options, from apartments to cozy rooms, and find the best fit for
              your needs.
            </p>
          </Col>
          <Col md={2}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-success">About</a></li>
              <li><a href="/contact" className="text-success">Contact</a></li>
              <li><a href="/terms" className="text-success">Terms of Service</a></li>
              <li><a href="/privacy" className="text-success">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p className='text-success'>Email: info@rentalplatform.com</p>
            <p className='text-success'>Phone: +1 234 567 890</p>
            <p className='text-success'>Address: 123 Main Street, Jakarta</p>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li ><a href="https://facebook.com" className="text-success">Facebook</a></li>
              <li><a href="https://instagram.com" className="text-success">Instagram</a></li>
              <li><a href="https://twitter.com" className="text-success">Twitter</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p className='text-success'>&copy; 2024 Rental Recommendation System. By AmiKos.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
