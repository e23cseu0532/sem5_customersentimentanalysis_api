'use client';

import type { AnalysisHistoryItem } from '@/lib/types';
import { useState } from 'react';
import { Dashboard } from '@/components/sentiment/dashboard';
import { SentimentAnalyzer } from '@/components/sentiment/sentiment-analyzer';
import { ModeToggle } from '@/components/sentiment/mode-toggle';
import { Logo } from '@/components/icons';

export default function Home() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);

  const handleNewAnalysis = (item: AnalysisHistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 20));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-lg">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="mr-4 flex items-center">
            <Logo className="h-6 w-6 mr-2" />
            <h1 className="font-headline text-lg font-semibold">
              Sentiment Insights
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <p className="hidden text-sm text-muted-foreground sm:block">
              Powered by your Custom Model
            </p>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SentimentAnalyzer onAnalysisComplete={handleNewAnalysis} />
          </div>
          <div className="lg:col-span-1">
            <Dashboard history={history} />
          </div>
        </div>
      </main>
    </div>
  );
}
