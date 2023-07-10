import React from 'react';
import Nav from '../components/navv/navv';
import Hero from '../components/hero/hero';
import AboutMe from '../components/aboutme/aboutme';
import Mid from '../components/mid/mid';
import Projects from '../components/projects/projects';
import Contacts from '../components/contacts/contacts';
import Footer from '../components/footer/footer';

export default function Main() {
  
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
  )
}
