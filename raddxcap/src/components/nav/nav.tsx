import React from 'react';
import './nav.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'

export default function nav() {
  const logo = require('../../assets/Logo.png')
  return (
    <div>
      <Row>
        <Navbar className='bg nav' expand="lg" sticky="top">
          <Container>
            <a href="#home">
              <img src={logo} className='logo-img' />
            </a>
            <div className='justify-content-end d-flex'>
              <Nav.Link href='#about' className='nav-items pavanam'>About</Nav.Link>
              <Nav.Link href='#projects' className='nav-items pavanam'>Projects</Nav.Link>
              <Nav.Link href='#contacts' className='nav-items pavanam'>Contacts</Nav.Link>
            </div>
          </Container>
        </Navbar>
      </Row>
    </div>
  )
}
