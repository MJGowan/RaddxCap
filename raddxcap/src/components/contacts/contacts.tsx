import React from 'react';
import './contacts.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function ContactForm() {
  const [state, handleSubmit] = useForm("mwkdeknl");
  if (state.succeeded) {
    return <ContactForm/>;
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
  return (
    <div id="contacts">
      <Container className='contact-container'>
        <div>
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
              <div className='d-none d-lg-block logo-container'>
                <FacebookIcon className='logos'/>
                <TwitterIcon className='logos'/>
                <LinkedInIcon className='logos'/>
                <InstagramIcon className='logos'/>
              </div>
            </Container>
          </Col>
          <Col className='col-md-6 d-lg-none'>
            <div>
                <FacebookIcon className='logos'/>
                <TwitterIcon className='logos'/>
                <LinkedInIcon className='logos'/>
                <InstagramIcon className='logos'/>
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
