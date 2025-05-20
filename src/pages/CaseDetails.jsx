import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();

  const fetchCase = async () => {
    const { data, error } = await supabase.from('cases').select('*').eq('id', id).single();
    if (error) console.error(error);
    else setCaseData(data);
  };

  useEffect(() => { fetchCase(); }, [id]);

  return (
    <div className="container">
      <h2>Case Details</h2>
      {caseData && (
        <>
          <h3>{caseData.title}</h3>
          <p>Status: {caseData.status}</p>
          <p>{caseData.description}</p>
          <button onClick={() => navigate('/dashboard')}>Back</button>
        </>
      )}
    </div>
  );
}

export default CaseDetails;
