import React, { useState } from "react";
import { sendPrompt } from "./api";

function PromptInterface() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Processing...");
    try {
      const res = await sendPrompt(prompt);
      setResponse(res.message || res.confirmation || "No response.");
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">AWS Prompt Agent</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          className="w-full px-4 py-2 text-black rounded mb-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt like 'create ec2 server'"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-6 w-full max-w-md bg-zinc-800 p-4 rounded">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default PromptInterface;

