import React, { useState } from 'react';
import './mid.css';
import {Container, Row, Col} from 'react-bootstrap';

export default function mid() {
  const bgImg = require('../../assets/Mid.png');
  return (
    <div>
      <img src={bgImg} className='midBgImg'/>
    </div>
  )
}
