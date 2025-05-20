import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const askOpenAI = async (messages) => {
  const response = await openai.post('/chat/completions', {
    model: 'gpt-4',
    messages
  });
  return response.data;
};
