// /pages/tools/brand-generator.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function BrandGenerator() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>AI Brand Generator | Thriveomate</title>
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>AI Brand Generator</h1>
        <p>Describe your business in a sentence. We’ll generate a brand name, slogan, and domain idea.</p>

        <input
          type="text"
          placeholder="e.g. a t-shirt store for dog lovers"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '1rem' }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !idea}
          style={{ marginTop: '1rem', padding: '10px 20px' }}
        >
          {loading ? 'Generating...' : 'Generate Brand'}
        </button>

        {result && (
          <div style={{ marginTop: '2rem' }}>
            <h2>Results</h2>
            <p><strong>Business Name:</strong> {result.name}</p>
            <p><strong>Slogan:</strong> {result.slogan}</p>
            <p><strong>Domain Idea:</strong> {result.domain}</p>
          </div>
        )}
      </main>
    </>
  );
}
