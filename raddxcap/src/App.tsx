import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/navv/navv';
import Hero from './components/hero/hero';
import AboutMe from './components/aboutme/aboutme';
import Mid from './components/mid/mid';
import Projects from './components/projects/projects';
import Contacts from './components/contacts/contacts';
import Footer from './components/footer/footer';

function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <AboutMe/>
      <Mid/>
      <Projects/>
      <Contacts/>
      <Footer/>
    </div>
  );
}

export default App;
