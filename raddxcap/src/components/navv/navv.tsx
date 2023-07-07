import React, {useState, useEffect} from 'react';
import './navv.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'

export default function Navv() {
  const logo = require('../../assets/Logo.png');
  const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        }
    })
  return (
    <div style={{ width: '100vw' }}>
      <Row>
        <Navbar className='bg nav' expand="lg" sticky="top">
          <Container>
            <a href="#home">
              <img src={logo} className='logo-img' />
            </a>

            {
              width < 1000 ? (
                <div></div>
              ) : (
                <div className='justify-content-end d-flex'>
                  <Nav.Link href='#about' className='nav-items pavanam'>About</Nav.Link>
                  <Nav.Link href='#projects' className='nav-items pavanam'>Projects</Nav.Link>
                  <Nav.Link href='#contacts' className='nav-items pavanam'>Contacts</Nav.Link>
                </div>
              )
            }
          </Container>
        </Navbar>
      </Row>
    </div>
  )
}
