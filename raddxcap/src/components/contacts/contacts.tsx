import React from 'react';
import './contacts.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("mwkdeknl");
  if (state.succeeded) {
    return <p>Thanks for reaching out!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className='lato'>
      <Container>
      <Row className='mb-2'>
        <label htmlFor="email">
          Email Address
        </label>
      </Row>
      <Row className='mb-3'>
        <input
          id="email"
          type="email"
          name="email"
          className='emailInput'
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </Row>
      <Row className='mb-3'>
        <textarea
          id="message"
          name="message"
          className='messageInput'
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </Row>
      <Row>
        <Col className='d-flex justify-content-end'>
        <button type="submit" disabled={state.submitting} className='submitBtn'>
          Submit
        </button>
        </Col>
      </Row>
      </Container>
    </form>
  );
}



export default function contacts() {
  const bgImg = require('../../assets/Contacts.png');
  const fbLogo = require('../../assets/facebook-dark.png');
  const twLogo = require('../../assets/twitter-dark.png');
  const liLogo = require('../../assets/linkedin-dark.png');
  const inLogo = require('../../assets/insta-dark.png');

  return (
    <div>
      <img src={bgImg} className='contactBgImg' />
      <Container>
        <div className='titleContainer'>
          <p className='section-title'>Contacts</p>
          <hr className='hrLength' />
        </div>
        <Row>
          <Col className='col-lg-6'>
            <Container>
              <div className='lato contactInfo'>
                <p>(209) 313-9953</p>
                <p>RaddCapitalBecky@gmail.com</p>
              </div>
              <div className='d-none d-lg-block'>
                <img src={fbLogo} className='logos' />
                <img src={twLogo} className='logos' />
                <img src={liLogo} className='logos' />
                <img src={inLogo} className='logos' />
              </div>
            </Container>
          </Col>
          <Col className='col-md-6 d-lg-none'>
            <div>
              <img src={fbLogo} className='logos' />
              <img src={twLogo} className='logos' />
              <img src={liLogo} className='logos' />
              <img src={inLogo} className='logos' />
            </div>
          </Col>
          <Col className='col-lg-6 col-md-12 formContainer'>
            <ContactForm />
          </Col>
        </Row>

      </Container>
    </div>
  )
}
