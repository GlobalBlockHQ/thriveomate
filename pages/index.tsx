// /pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Thriveomate | AI Business Builder</title>
        <meta name="description" content="Start and run your business with AI. Thriveomate automates everything — from branding to support to scaling." />
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Welcome to Thriveomate</h1>
        <p>
          Your AI-powered business cofounder. Thriveomate helps anyone — from solo founders to Web3 builders —
          launch, grow, and run a business completely hands-free.
        </p>

        <h2>Plans</h2>
        <ul>
          <li><strong>Starter (Free):</strong> Basic setup, 1 project, limited AI tools</li>
          <li><strong>Pro ($19/mo):</strong> Unlimited projects, advanced tools, AI marketing</li>
          <li><strong>Elite ($49/mo):</strong> Full suite + growth optimizer + premium support</li>
        </ul>

        <p>
          <strong>Bonus:</strong> Optional security upgrade tiers available — handled by AI bots.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/dashboard">
            <button style={{ padding: '10px 20px', fontSize: '1rem' }}>Get Started</button>
          </Link>
        </div>
      </main>
    </>
  );
}
