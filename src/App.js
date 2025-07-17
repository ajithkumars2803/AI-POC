import React, { useState } from 'react';
import './App.css';

const API_URL = "https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations"; // <-- your API Gateway URL

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleLogin = () => {
    if (username === 'Ajithkumar' && password === 'Ajith@123') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const callAPI = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // send the prompt as JSON
      });

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(`Error: ${error.message}`);
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
            placeholder="Enter your prompt, e.g. 'create an ec2 server'"
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

