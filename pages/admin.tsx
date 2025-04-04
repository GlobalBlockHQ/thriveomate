import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Lightbulb } from 'lucide-react';

export default function AdminInsightsPage() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/insights.json')
      .then((res) => res.text())
      .then((text) => {
        const items = text
          .replace(/^"|"$/g, '') // remove outer quotes
          .split('\\n') // split into lines
          .filter(Boolean); // clean up
        setIdeas(items);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Sparkles className="text-yellow-400" /> AI Growth Insights
      </h1>

      {loading ? (
        <p>Loading insights...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas.map((idea, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Idea #{idx + 1}</h2>
                  <Lightbulb className="text-blue-400" />
                </div>
                <p className="mt-2 text-gray-700">{idea}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
