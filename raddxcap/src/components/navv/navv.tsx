import React, { useState, useEffect } from 'react';
import './navv.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'
import LogoutIcon from '@mui/icons-material/Logout';
import { checkToken } from '../../Services/DataService';

export default function Navv() {
  const logo = require('../../assets/Logo.png');
  const [adminOn, setAdminOn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    if (checkToken()) {
      setAdminOn(true);
    }

    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    }
  });

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ width: '100vw' }} id='navv'>
      <Row>
        <Navbar className='bg nav'>
          <Container>
            <a href="#home">
              <img src={logo} className='logo-img' />
            </a>

            {
              width < 1000 ? (
              <div>
                {
                    adminOn ? (
                      <Nav.Link className='nav-items nav-icon pavanam' onClick={logout}><LogoutIcon/></Nav.Link>
                    ) : (
                      <></>
                    )
                  }
              </div>
              ) : (
                <div className='justify-content-end d-flex'>
                  <Nav.Link href='#about' className='nav-items pavanam'>About</Nav.Link>
                  <Nav.Link href='#projects' className='nav-items pavanam'>Projects</Nav.Link>
                  <Nav.Link href='#contacts' className='nav-items pavanam'>Contacts</Nav.Link>
                  {
                    adminOn ? (
                      <Nav.Link className='nav-items nav-icon pavanam' onClick={logout}><LogoutIcon/></Nav.Link>
                    ) : null
                  }
                </div>
              )
            }
          </Container>
        </Navbar>
      </Row>
    </div>
  )
}
