import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function Dashboard() {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  const fetchCases = async () => {
    const user = supabase.auth.getUser();
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('user_id', (await user).data.user.id);
    if (error) console.error(error);
    else setCases(data);
  };

  useEffect(() => { fetchCases(); }, []);

  return (
    <div className="container">
      <h2>My Dashboard</h2>
      <button onClick={() => navigate('/start-case')}>Start New Case</button>
      <ul>
        {cases.map(c => (
          <li key={c.id} onClick={() => navigate(`/case/${c.id}`)}>
            {c.title} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
