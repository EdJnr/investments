import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/login/login';
import SignUp from './pages/sign-up/signUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/dashboard/dashboard';
import { CoinPage } from './pages/coinPage/coinPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/currency/:id' element={<CoinPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
