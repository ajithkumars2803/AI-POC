// src/PromptForm.js
import React, { useState } from "react";

function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const text = await res.text();
    setResponse(text);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "create a ec2 server" or "create a s3 bucket"'
        />
        <button type="submit">Submit</button>
      </form>
      {response && <pre>{response}</pre>}
    </>
  );
}

export default PromptForm;

