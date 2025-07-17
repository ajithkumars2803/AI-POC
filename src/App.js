import React, { useState } from 'react';
import './App.css';

const API_URL = "https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');

  const handleLogin = () => {
    if (username === 'Ajithkumar' && password === 'Ajith@123') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const callAPI = async () => {
    let promptToSend = prompt.trim();

    // If user types "yes" or similar, send "confirm <lastPrompt>"
    if (
      awaitingConfirmation &&
      ['yes', 'ok', 'okay', 'y'].includes(prompt.toLowerCase())
    ) {
      promptToSend = `confirm ${lastPrompt}`;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));

      // If backend responds with confirmation message, enable next-step logic
      if (
        data.confirmation &&
        data.confirmation.toLowerCase().includes('shall i continue')
      ) {
        setAwaitingConfirmation(true);
        setLastPrompt(prompt); // remember original request
      } else {
        setAwaitingConfirmation(false);
        setLastPrompt('');
      }

      setPrompt('');
    } catch (error) {
      console.error('API call failed:', error);
      setApiResponse(`🚨 Error: ${error.message}`);
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
        <div className="dashboard">
          <h2>Welcome, {username}</h2>
          <textarea
            rows="4"
            cols="50"
            placeholder={awaitingConfirmation ? 'Type yes to confirm...' : 'Enter your prompt, e.g. "create ec2 server"'}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          /><br />
          <button onClick={callAPI}>Send Prompt</button>
          <pre>{apiResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

