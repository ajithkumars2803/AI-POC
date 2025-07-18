import React, { useState } from 'react';
import ConfirmationPopup from './ConfirmationPopup';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function PromptInterface() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handlePrompt = async () => {
    if (!API_URL) {
      console.error("API_URL is not defined. Check your .env file.");
      setResponse("❌ API URL not configured.");
      return;
    }

    try {
      const res = await axios.post(API_URL, { prompt });
      const data = res.data;

      if (data.confirmation) {
        setConfirmation(data.confirmation);
      } else {
        setResponse(data.message || JSON.stringify(data));
      }
    } catch (error) {
      console.error("API error:", error);
      setResponse(`🚨 Error: ${error.message}`);
    }
  };

  const handleConfirmation = async (confirmed) => {
    setConfirmation(null);

    if (confirmed) {
      try {
        const res = await axios.post(API_URL, { prompt: 'yes' });
        setResponse(res.data.message || JSON.stringify(res.data));
      } catch (error) {
        console.error("Confirmation error:", error);
        setResponse(`🚨 Error: ${error.message}`);
      }
    } else {
      setResponse("✅ I did not create anything.");
    }
  };

  return (
    <div>
      <h2>Enter Prompt</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. create ec2 server"
        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={handlePrompt}>Submit</button>

      <p style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
        <strong>Response:</strong><br />
        {response}
      </p>

      {confirmation && (
        <ConfirmationPopup
          message={confirmation}
          onConfirm={() => handleConfirmation(true)}
          onCancel={() => handleConfirmation(false)}
        />
      )}
    </div>
  );
}

export default PromptInterface;

