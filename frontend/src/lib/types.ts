export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export interface AnalysisResult {
  sentiment: Sentiment;
  confidence: number;
}

export interface AnalysisHistoryItem extends AnalysisResult {
  id: string;
  text: string;
}
