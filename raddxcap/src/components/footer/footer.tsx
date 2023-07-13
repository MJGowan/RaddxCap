import React, { useState, useEffect } from 'react';
import './footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  let navigate = useNavigate();
  const admin = () => {
    navigate("/Login");
  }

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    }
  });

const fbLogo = require('../../assets/facebook-light.png');
const twLogo = require('../../assets/twitter-light.png');
const liLogo = require('../../assets/linkedin-light.png');
const inLogo = require('../../assets/insta-light.png');

return (
  <div id="footer">
    <Row className='footerContainer'>
      <Container>
        <Row>
          <Col>
            <p>Las Vegas, NV 89131</p>
            <p>(209) 313-9953</p>
            <p>RaddCapitalBecky@gmail.com</p>
          </Col>
          <Col className='right-half'>
            <p className='d-flex justify-content-end'><span onClick={admin}>Admin</span></p>
            <div className='d-flex justify-content-end'>
              <img src={fbLogo} className='logos' />
              <img src={twLogo} className='logos' />
              <img src={liLogo} className='logos' />
              <img src={inLogo} className='logos' />
            </div>
            <p></p>
            {
              window.innerWidth < 768 ? (
                <p className='d-flex justify-content-end'>Site by Madeline Gowan</p>
              ) : (
                <p className='d-flex justify-content-end'>Site designed and developed by Madeline Gowan</p>
              )
            }

          </Col>
        </Row>
      </Container>
    </Row>
  </div>
)
}
