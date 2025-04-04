// /pages/admin/status.tsx

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AdminStatusPanel() {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/status')
      .then((res) => res.json())
      .then((data) => {
        setBots(data.bots);
        setLoading(false);
      });
  }, []);

  const passingBots = bots.filter(bot => bot.status.includes('✅')).length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🤖 AI Bot Health Dashboard</h1>

      <Card className="bg-green-50 border border-green-200">
        <CardContent className="p-4">
          <p className="text-green-800 font-medium">
            {passingBots} of {bots.length} bots are healthy and running smoothly ✅
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="animate-spin" /> <span>Loading bot status...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bots.map((bot, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{bot.name}</h2>
                  {bot.status.includes('✅') ? (
                    <ShieldCheck className="text-green-500" />
                  ) : (
                    <AlertTriangle className="text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-600 mt-2">{bot.status}</p>
                <p className="text-sm text-gray-500 mt-1">{bot.log}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
