import React, { useState } from 'react';
import './App.css';
import TextInput from './TextInput';

function App() {
  const [response, setResponse] = useState('');

  const handleSubmit = async (text) => {
    try {
      const res = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>PWA Assignment</h1>
      <TextInput onSubmit={handleSubmit} />
      {response && <p>Response from backend: {response}</p>}
    </div>
  );
}

export default App;

