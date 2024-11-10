import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Item from './pages/Item';
import NotFound from './pages/NotFound';
import Items from './pages/Items';
import 'bootstrap/dist/css/bootstrap.min.css'
import SalesPage from './pages/SalesPage';
import NavBar from './components/NavBar';



function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/items/:search" element={<Items/>} />
          <Route path="/item/:id" element={<Item />} /> 
          <Route path="/sales" element={<SalesPage/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
