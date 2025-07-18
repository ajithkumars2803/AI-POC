import React, { useState } from 'react';
import ConfirmationPopup from './ConfirmationPopup';
import axios from 'axios';

function PromptInterface() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [lastPrompt, setLastPrompt] = useState(''); // track last prompt

  const handlePrompt = async () => {
    try {
      const res = await axios.post('https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations', {
        prompt,
      });
      const data = res.data;
      if (data.confirmation) {
        setConfirmation(data.confirmation);
        setLastPrompt(prompt); // save the original prompt
      } else {
        setResponse(data.message || JSON.stringify(data));
      }
    } catch (error) {
      console.error("API error:", error);
      setResponse("API call failed");
    }
  };

  const handleConfirmation = async (confirmed) => {
    setConfirmation(null);
    if (confirmed) {
      try {
        const res = await axios.post('https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations', {
          prompt: lastPrompt,
          confirm: true,
        });
        setResponse(res.data.message || JSON.stringify(res.data));
      } catch (error) {
        console.error("Confirmation API error:", error);
        setResponse("Failed to confirm action.");
      }
    } else {
      setResponse("I did not create anything.");
    }
  };

  return (
    <div>
      <h2>Enter Prompt</h2>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={handlePrompt}>Submit</button>
      <p>Response: {response}</p>
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

