import React, { useState } from 'react';
import { askOpenAI } from '../services/openaiClient';

function DocumentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const generateDoc = async () => {
    const messages = [
      {
        role: 'system',
        content: 'You are a legal document generator. Format all content as official court filings.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const result = await askOpenAI(messages);
    setOutput(result.choices[0].message.content);
  };

  return (
    <div>
      <h3>Generate Legal Document</h3>
      <textarea placeholder="Describe the document you need..." onChange={e => setPrompt(e.target.value)} />
      <button onClick={generateDoc}>Generate</button>
      <pre>{output}</pre>
    </div>
  );
}

export default DocumentGenerator;
