import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import './App.css';
import Header from './header/header.component';
import HomePage from './pages/homepage/homepage.components';

function App() {
  return (
    <Router>
    <div>
    <Header />
    <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route path='/shop' element={<ShopPage />}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;