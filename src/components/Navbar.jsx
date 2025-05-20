import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1>Due Process AI</h1>
      <div>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/start-case')}>New Case</button>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
