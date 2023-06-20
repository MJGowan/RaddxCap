import React from 'react';
import './hero.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function hero() {
  const heroimg = require('../../assets/Hero.png');

  return (
    <div style={{ color: 'white' }} className='mb-5'>
      <img src={heroimg} className='hero-img' />
      <Container>
        <Row className='txt-container'>
          <p className='hero-title lato'>RaddxCap Investments</p>
          <p className='hero-txt lato'>Real Estate Solutions for Real Investors</p>
        </Row>
      </Container>
    </div>
  )
}
