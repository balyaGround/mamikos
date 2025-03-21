import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import '../styles/Header.css'; // Import the styles
import logo from "../assets/amikos.png";

const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src={logo} alt="Rental Logo" className="navbar-logo" />
        </Navbar.Brand>
        
        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          
          {/* Login/Sign Up Button */}
          <Button className="login-button" href="/">Login / Sign Up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
