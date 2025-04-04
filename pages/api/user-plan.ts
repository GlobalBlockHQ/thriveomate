// /pages/api/user-plan.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// TEMP: This should match what the webhook wrote earlier
const userPlans: Record<string, string> = {
  'hyside76@gmail.com': 'pro',
  'hyside76@protonmail.com': 'elite',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email as string;

  const plan = userPlans[email] || 'Starter';
  res.status(200).json({ plan });
}
