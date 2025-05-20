import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StartCase from './pages/StartCase';
import CaseDetails from './pages/CaseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-case" element={<StartCase />} />
        <Route path="/case/:id" element={<CaseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
