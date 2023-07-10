import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/main';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>

      </div>

    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
