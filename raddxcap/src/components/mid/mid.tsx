import React, { useState } from 'react';
import './mid.css';
import {Container, Row, Col} from 'react-bootstrap';

export default function mid() {
  const bgImg = require('../../assets/Mid.png');
  const becky = require('../../assets/Mom.png');
  return (
    <div>
      <img src={bgImg} className='midBgImg'/>
      <Container className='mid-items'>
        <Row>
          <Col>
          <div>
            <img src={becky} className='becky'/>
          </div>
          </Col>
          <Col>
            <Container className='dark-box-txt'>
              <p className='pavanam'>I am thrilled to be a part of this chapter of your life. I know that buying a home or property is one of the biggest decisions you may ever make, and I’m committed to helping you through this difficult process.</p>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
