import React, { useState, useEffect } from 'react';
import Nav from '../components/navv/navv';
import Hero from '../components/hero/hero';
import AboutMe from '../components/aboutme/aboutme';
import Mid from '../components/mid/mid';
import Projects from '../components/projects/projects';
import AdminProjects from '../components/adminprojects/adminprojects';
import Contacts from '../components/contacts/contacts';
import Footer from '../components/footer/footer';
import { checkToken } from '../Services/DataService';

export default function Main() {
  const [adminOn, setAdminOn] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      setAdminOn(true);
    }
  })

  return (
    <div>
      <Nav />
      <Hero />
      <AboutMe />
      <Mid />
      {
        adminOn ? (
          <AdminProjects />
        ) : (
          <Projects />
        )
      }

      <Contacts />
      <Footer />
    </div>
  )
}
