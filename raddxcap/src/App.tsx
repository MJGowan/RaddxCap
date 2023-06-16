import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/nav/nav';
import Hero from './components/hero/hero';
import Mid from './components/mid/mid';
import Projects from './components/projects/projects';
import Contacts from './components/contacts/contacts';
import Footer from './components/footer/footer';

function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
    </div>
  );
}

export default App;
