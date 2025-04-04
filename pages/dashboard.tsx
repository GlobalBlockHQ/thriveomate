// /pages/dashboard.tsx

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [plan, setPlan] = useState('Loading...');

  useEffect(() => {
    // Temporary: Simulate fetching user plan from backend
    // Replace with real fetch later (from DB or session)
    const email = 'hyside76@gmail.com'; // Replace with real logged-in email when auth is connected

    fetch(`/api/user-plan?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => setPlan(data.plan || 'Starter'))
      .catch(() => setPlan('Starter'));
  }, []);

  const upgradeButtons = (
    <>
      <h2>Upgrade Your Plan</h2>
      <button style={{ marginRight: '1rem', padding: '10px 20px' }} onClick={() => handleUpgrade('pro')}>
        Upgrade to Pro – $19/mo
      </button>
      <button style={{ padding: '10px 20px' }} onClick={() => handleUpgrade('elite')}>
        Upgrade to Elite – $49/mo
      </button>
    </>
  );

  const handleUpgrade = async (selectedPlan: string) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan }),
      });
      const data = await res.json();
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      }
    } catch (err) {
      console.error(err);
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
          {plan === 'Starter' && (
            <>
              <p>You’re on the free plan. Upgrade to unlock all AI tools.</p>
              {upgradeButtons}
            </>
          )}

          {plan === 'Pro' && (
            <ul>
              <li>Unlimited AI tools</li>
              <li>Marketing bot access</li>
              <li>Security monitoring</li>
            </ul>
          )}

          {plan === 'Elite' && (
            <ul>
              <li>All Pro features</li>
              <li>ThriveAI Mentor (strategy + growth AI)</li>
              <li>Priority access to all new tools</li>
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

