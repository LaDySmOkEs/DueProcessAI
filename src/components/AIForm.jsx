import React, { useState } from 'react';
import { askOpenAI } from '../services/openaiClient';

function AIForm() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const result = await askOpenAI([
      { role: 'user', content: input }
    ]);
    setResponse(result.choices[0].message.content);
  };

  return (
    <div>
      <h3>Ask the AI</h3>
      <textarea placeholder="Ask a legal question" onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <pre>{response}</pre>
    </div>
  );
}

export default AIForm;
