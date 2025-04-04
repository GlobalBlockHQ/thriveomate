// /pages/admin/errors.tsx

import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Bug, TerminalSquare } from 'lucide-react';

interface ErrorPageProps {
  logs: string[];
}

export default function AdminErrorPage({ logs }: ErrorPageProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Bug className="text-red-400" /> System Error & Rollback Logs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.length === 0 ? (
          <p>No errors or rollbacks recorded yet.</p>
        ) : (
          logs.map((line, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TerminalSquare className="text-gray-400" />
                  <span className="font-mono text-sm">{line}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const logPath = path.join(process.cwd(), 'logs/errors.log');
  let logs: string[] = [];

  try {
    const content = fs.readFileSync(logPath, 'utf8');
    logs = content.split('\n').filter((line) => line.trim().length > 0);
  } catch (e) {
    logs = [];
  }

  return {
    props: {
      logs,
    },
  };
};
