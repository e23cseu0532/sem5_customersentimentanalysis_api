'use client';

import { BarChart, FileText, Gauge, PieChart as PieChartIcon, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import type { AnalysisHistoryItem } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface DashboardProps {
  history: AnalysisHistoryItem[];
}

const chartConfig = {
  positive: {
    label: 'Positive',
    color: 'hsl(var(--chart-1))',
  },
  negative: {
    label: 'Negative',
    color: 'hsl(var(--chart-2))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function Dashboard({ history }: DashboardProps) {
  const totalAnalyses = history.length;
  const positiveCount = history.filter(item => item.sentiment === 'Positive').length;
  const negativeCount = history.filter(item => item.sentiment === 'Negative').length;
  const neutralCount = totalAnalyses - positiveCount - negativeCount;
  
  const avgConfidence =
    totalAnalyses > 0
      ? history.reduce((acc, item) => acc + item.confidence, 0) / totalAnalyses
      : 0;

  const chartData = [
    { name: 'Positive', value: positiveCount, fill: 'var(--color-positive)' },
    { name: 'Negative', value: negativeCount, fill: 'var(--color-negative)' },
    { name: 'Neutral', value: neutralCount, fill: 'var(--color-neutral)' },
  ].filter(d => d.value > 0);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Key metrics and analysis history.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
             <BarChart className="size-4" />
             Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4 flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{totalAnalyses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Conf.</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{(avgConfidence * 100).toFixed(0)}%</div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
           <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
             <PieChartIcon className="size-4" />
             Sentiment Ratio
          </h3>
          <div className="flex justify-center">
             { history.length > 0 ? (
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[150px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60} strokeWidth={2}>
                       {chartData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                  </PieChart>
                </ChartContainer>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground h-[150px]">
                  <PieChartIcon className="size-8 mb-2" />
                  <p>No data to display</p>
                </div>
              )
            }
          </div>
        </div>

        <Separator />

        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
            <History className="size-4" />
            Recent History
          </h3>
          <ScrollArea className="flex-1">
            <div className="space-y-2 pr-4">
              {history.length > 0 ? (
                history.map(item => (
                  <div key={item.id} className="p-2 rounded-md border text-xs">
                    <p className="truncate font-medium">{item.text}</p>
                    <div className="flex justify-between items-center mt-1 text-muted-foreground">
                      <span
                        className={cn(
                          'font-semibold',
                          item.sentiment === 'Positive' && 'text-green-500',
                          item.sentiment === 'Negative' && 'text-red-500',
                          item.sentiment === 'Neutral' && 'text-yellow-500'
                        )}
                      >
                        {item.sentiment}
                      </span>
                      <span>{(item.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No analyses yet.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
