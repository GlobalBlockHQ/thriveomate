// /pages/dashboard.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [plan, setPlan] = useState('Starter'); // Placeholder; later pulled from Stripe or session

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
          <p>Unlock advanced tools and priority support with Pro or Elite tiers.</p>
          <button style={{ padding: '10px 20px' }}>Upgrade Now</button> {/* Will connect to Stripe */}
        </section>
      </main>
    </>
  );
}
