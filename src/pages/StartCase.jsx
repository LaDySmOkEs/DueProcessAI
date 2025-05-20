import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function StartCase() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = await supabase.auth.getUser();
    const { error } = await supabase.from('cases').insert({
      title,
      description: desc,
      user_id: user.data.user.id,
      status: 'active'
    });
    if (error) return alert(error.message);
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Start New Case</h2>
      <input placeholder="Case Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Case Description" onChange={e => setDesc(e.target.value)} />
      <button onClick={handleSubmit}>Submit Case</button>
    </div>
  );
}

export default StartCase;
