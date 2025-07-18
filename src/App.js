import React, { useState } from 'react';
import Login from './components/Login';
import PromptInterface from './components/PromptInterface';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      {isLoggedIn ? <PromptInterface /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;

