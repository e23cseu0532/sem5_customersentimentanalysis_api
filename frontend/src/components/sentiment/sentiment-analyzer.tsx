'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisHistoryItem, AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader2, Wand2, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SentimentAnalyzerProps {
  onAnalysisComplete: (item: AnalysisHistoryItem) => void;
}

const sampleReviews = [
  'The battery life on this new phone is incredible! Lasts me two full days with heavy usage. The camera is also a huge step up.',
  'I was really disappointed with the service. My order was late, and when it arrived, it was the wrong item. Customer support was not helpful.',
  'The movie was okay. The plot was a bit predictable, and the acting was decent but not outstanding. Not bad for a Saturday night.',
  'Absolutely love this new coffee machine! It\'s fast, quiet, and makes the perfect espresso every time. A game-changer for my mornings.',
];

const API_ENDPOINT = 'https://customersentimentanalysis-production.up.railway.app/predict';

interface ApiResponse {
  success: boolean;
  result: {
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    confidence: number;
    label: 0 | 1 | 2;
  };
}

export function SentimentAnalyzer({ onAnalysisComplete }: SentimentAnalyzerProps) {
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (reviewText.trim().length < 20) {
      toast({
        title: 'Input Too Short',
        description: 'Please enter a review with at least 20 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reviewText }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        const analysisResult: AnalysisResult = {
          sentiment: data.result.sentiment,
          confidence: data.result.confidence / 100, // Convert percentage to a 0-1 float
        };
        
        const fullHistoryItem: AnalysisHistoryItem = { 
          ...analysisResult, 
          id: new Date().toISOString(),
          text: reviewText 
        };

        onAnalysisComplete(fullHistoryItem);
        setResult(analysisResult);
      } else {
        throw new Error('API returned an unsuccessful response.');
      }

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'An unexpected error occurred. Please check your connection or try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setReviewText('');
    setResult(null);
  };

  const handleSampleClick = (sample: string) => {
    setReviewText(sample);
    setResult(null);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
          <CardTitle>Customer Review Analysis</CardTitle>
          <CardDescription>Enter a customer review below to analyze its sentiment.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col relative">
        <Textarea
          placeholder="Type or paste a customer review here..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          className="w-full flex-1 resize-none text-base bg-transparent focus-visible:ring-offset-0 p-2 rounded-md"
          maxLength={2000}
          disabled={isLoading}
        />
         <AnimatePresence>
          {result && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  'h-full w-full p-8 flex flex-col items-center justify-center transition-colors duration-300 rounded-lg',
                  result.sentiment === 'Positive' && 'bg-green-500/10',
                  result.sentiment === 'Negative' && 'bg-red-500/10',
                  result.sentiment === 'Neutral' && 'bg-yellow-500/10'
                )}
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                    <p className="font-semibold text-lg mb-4 text-muted-foreground">Analysis Result</p>
                    <span
                      className={cn(
                        'text-6xl md:text-8xl font-bold tracking-tighter',
                        result.sentiment === 'Positive' && 'text-green-500',
                        result.sentiment === 'Negative' && 'text-red-500',
                        result.sentiment === 'Neutral' && 'text-yellow-500'
                      )}
                    >
                      {result.sentiment}
                    </span>
                    <span className="text-2xl font-bold mt-4 text-foreground">
                      {(result.confidence * 100).toFixed(1)}%
                       <span className="text-lg font-medium text-muted-foreground ml-2">Confidence</span>
                    </span>

                     <Button variant="outline" onClick={handleClear} className="mt-8">
                       <X className="mr-2 h-4 w-4" /> Analyze Another
                     </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Or try a sample review:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleReviews.map((review, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2 leading-snug text-left justify-start"
                onClick={() => handleSampleClick(review)}
                disabled={isLoading}
              >
                <p className="truncate">{review}</p>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {reviewText.length} / 2000
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleClear} disabled={isLoading || !reviewText}>
              <X className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button onClick={handleAnalyze} disabled={isLoading} className="hover:animate-pulse-glow">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Analyze Sentiment
            </Button>
          </div>
      </CardFooter>
    </Card>
  );
}
