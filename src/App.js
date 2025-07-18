// src/App.js
import React, { useState } from "react";
import Login from "./Login";
import PromptForm from "./PromptForm";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <h2>AI AWS Resource Creator</h2>
          <PromptForm />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

