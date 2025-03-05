import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import '../styles/Header.css'; // Import the new styles
import logo from "../assets/amikos.png"
const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Rental Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto search-form">
            <FormControl
              type="search"
              placeholder="Search for rentals"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="login-button">Search</Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="/home">NIKI</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Button variant="outline-success" className="login-button" href="/">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
