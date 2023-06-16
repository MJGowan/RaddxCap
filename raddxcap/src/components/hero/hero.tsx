import React from 'react';
import './hero.css';
import {Container, Row, Col} from 'react-bootstrap';

export default function hero() {
  const heroimg = require('../../assets/Hero.png');
  
  return (
    <div style={{color: 'white'}}>
      <img src={heroimg} className='hero-img'/>
        <Row className='txt-container'>
          <p className='hero-title'>RaddxCap Investments</p>
          <p className='hero-txt'>Real Estate Solutions for Real Investors</p>
        </Row>
    </div>
  )
}
