import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

function EvidenceUpload({ caseId }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');

  const handleUpload = async () => {
    const { data, error: uploadError } = await supabase.storage
      .from('evidence-files')
      .upload(`case-${caseId}/${file.name}`, file);

    if (uploadError) return alert(uploadError.message);

    const fileUrl = `${supabase.storageUrl}/object/public/evidence-files/${data.path}`;
    const user = await supabase.auth.getUser();

    const { error } = await supabase.from('evidence').insert({
      case_id: caseId,
      file_url: fileUrl,
      notes,
      user_id: user.data.user.id
    });

    if (error) alert(error.message);
    else alert('Evidence uploaded!');
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <textarea placeholder="Notes..." onChange={e => setNotes(e.target.value)} />
      <button onClick={handleUpload}>Upload Evidence</button>
    </div>
  );
}

export default EvidenceUpload;
