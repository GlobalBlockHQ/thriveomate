// /pages/admin.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [log, setLog] = useState<string[]>([
    '[ManagerBot] System online.',
    '[DeployBot] Last commit deployed successfully.',
    '[MarketingBot] 1 new blog post scheduled for tomorrow.',
  ]);

  const handleLogin = () => {
    if (input === 'founder-access') {
      setAuthenticated(true);
    } else {
      alert('Incorrect passphrase.');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Panel | Thriveomate</title>
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        {!authenticated ? (
          <>
            <h1>Admin Login</h1>
            <p>Enter your passphrase to access the system:</p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Passphrase"
              style={{ padding: '8px', fontSize: '1rem' }}
            />
            <button onClick={handleLogin} style={{ marginLeft: '1rem', padding: '8px 16px' }}>
              Enter
            </button>
          </>
        ) : (
          <>
            <h1>Thriveomate AI Admin Panel</h1>
            <p>Welcome, Founder. Here’s what your bots have been up to:</p>

            <ul style={{ marginTop: '1rem' }}>
              {log.map((entry, idx) => (
                <li key={idx}>{entry}</li>
              ))}
            </ul>

            <div style={{ marginTop: '2rem' }}>
              <h2>Ask ManagerBot</h2>
              <p>Try: “Update landing page headline” or “Add new AI mentor section”</p>
              <input
                type="text"
                style={{ width: '100%', padding: '10px' }}
                placeholder="Type a command..."
              />
              <button style={{ marginTop: '0.5rem', padding: '8px 16px' }}>
                Send to ManagerBot
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
