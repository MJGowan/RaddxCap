import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './aboutme.css';

export default function aboutme() {
  const aboutMeTxt = `With a deep-rooted commitment to making a positive impact, and an extensive background in diverse industries, RaddxCap is your trusted partner for dynamic investments. When it comes to real estate opportunities, we have a deep understanding of the market dynamics and a keen eye for spotting potential. We assist both investors and business owners in identifying and acquiring properties with a comprehensive approach that encompasses due diligence, financial analysis, negotiation, and funding, ensuring a seamless transition and setting the stage for long-term success.`;
  return (
    <div>
      <Container className='aboutMe mb-5'>
      <Row>
        <p className='pavanam aboutMeTitle'>About Me</p>
        <Col>
        <hr className='hrLength'/>
        </Col>
        <p className='lato'>{aboutMeTxt}</p>
        <p className='lato'></p>
      </Row>
    </Container>
    </div>
  )
}
