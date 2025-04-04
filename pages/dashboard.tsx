// /pages/dashboard.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [plan, setPlan] = useState('Starter'); // Placeholder for real plan detection
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (selectedPlan: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await res.json();
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        alert('Checkout session failed.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thriveomate Dashboard</title>
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Welcome to Your AI Dashboard</h1>
        <p>Your current plan: <strong>{plan}</strong></p>

        <section style={{ marginTop: '2rem' }}>
          <h2>ThriveAI Tools</h2>
          <ul>
            <li>Business Name + Brand Generator (coming soon)</li>
            <li>Website Builder (coming soon)</li>
            <li>Marketing Bot – auto-publishes content</li>
            <li>Security Bot – monitors threats and abuse</li>
            <li>ThriveAI Mentor – personalized business advisor</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Upgrade Your Plan</h2>
          <button onClick={() => handleUpgrade('pro')} disabled={loading} style={{ marginRight: '1rem', padding: '10px 20px' }}>
            Upgrade to Pro – $19/mo
          </button>
          <button onClick={() => handleUpgrade('elite')} disabled={loading} style={{ padding: '10px 20px' }}>
            Upgrade to Elite – $49/mo
          </button>
        </section>
      </main>
    </>
  );
}

