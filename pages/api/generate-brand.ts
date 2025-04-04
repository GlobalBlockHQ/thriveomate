// /pages/api/generate-brand.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Missing idea' });
  }

  const prompt = `
  You're an expert brand strategist. Create a business name, slogan, and domain idea for this concept:
  "${idea}"

  Format:
  - Name:
  - Slogan:
  - Domain:
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    const text = completion.choices[0].message.content || '';

    const match = {
      name: text.match(/Name:\s*(.*)/)?.[1] || 'Unnamed',
      slogan: text.match(/Slogan:\s*(.*)/)?.[1] || '',
      domain: text.match(/Domain:\s*(.*)/)?.[1] || '',
    };

    res.status(200).json(match);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate brand' });
  }
}
