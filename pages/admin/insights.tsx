// /pages/admin/insights.tsx

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Lightbulb } from 'lucide-react';

const mockIdeas = [
  {
    title: 'AI Logo Generator Tool',
    source: 'Product Hunt Trend',
    reason: 'AI branding tools are getting traction in solo founder space.'
  },
  {
    title: 'AI Legal Assistant for LLC setup',
    source: 'Reddit Startup Thread',
    reason: 'Common request in early-stage founders for formation guidance.'
  },
  {
    title: 'GPT-powered pitch deck builder',
    source: 'GitHub trending repo',
    reason: 'High stars on open-source auto-pitch builder using GPT-4.'
  }
];

export default function AdminInsightsPage() {
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetch from future AI advisor bot
    setIdeas(mockIdeas);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Sparkles className="text-yellow-400" /> AI Growth Insights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{idea.title}</h2>
                <Lightbulb className="text-blue-400" />
              </div>
              <p className="text-sm text-gray-500 mt-2 italic">{idea.source}</p>
              <p className="text-gray-700 mt-2">{idea.reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
