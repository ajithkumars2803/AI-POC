import React, { useState } from 'react';
import './App.css';

const API_URL = 'https://testsagemakerapi.com'; // Replace with full endpoint if needed

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = () => {
    if (username === 'Ajithkumar' && password === 'Ajith@123') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const sendPromptToAPI = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="login">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="prompt-area">
          <h2>Welcome, {username}</h2>
          <textarea
            rows="4"
            cols="50"
            placeholder="Type your instruction (e.g., I need to create a EC2 server)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <br />
          <button onClick={sendPromptToAPI}>Submit Prompt</button>
          <h3>API Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

