import React, { useState } from 'react';
import './login.css';
import { login, getLoggedInUserData } from '../../Services/DataService';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export default function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    let userData = {
      username,
      password
    }
    console.log(userData);
    let token = await login(userData);
    console.log(token);
    if (token != null) {
      localStorage.setItem("Token", token);
      await getLoggedInUserData(username);
      navigate("/");
    }
  }

  return (
    <div id="admin">
      <Container className='admin-box'>
        <Row className='mb-4'>
          <p className='section-title'>Admin</p>
          <hr />
        </Row>

        <Row className='mb-2 labels'>
          <label>
            Username
          </label>
        </Row>
        <Row className='mb-5'>
          <input type='username' className='inputs username' onChange={({ target: { value } }) => setUsername(value)} />
        </Row>
        <Row className='mb-2 labels'>
          <label>
            Password
          </label>
        </Row>
        <Row className='mb-5'>
          <input type='password' className='inputs password' onChange={({ target: { value } }) => setPassword(value)} />
        </Row>
        <Row>
          <Col className='d-flex justify-content-end'>
            <button className='submitBtn' onClick={handleSubmit}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}