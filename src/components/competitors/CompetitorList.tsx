
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CompetitorItem {
  name: string;
  score: number;
}

interface CompetitorListProps {
  competitors: CompetitorItem[];
}

export const CompetitorList = ({ competitors }: CompetitorListProps) => {
  // Format data for the chart
  const chartData = competitors.map(competitor => ({
    name: competitor.name,
    score: competitor.score,
  }));

  // Generate colors based on scores (higher scores = more concerning competitors)
  const getBarColor = (score: number) => {
    if (score >= 75) return "#ef4444"; // red (more concerning)
    if (score >= 50) return "#eab308"; // yellow
    return "#22c55e"; // green (less concerning)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Competitors in AI Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          These competitors are frequently mentioned alongside your brand in AI responses
        </p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip
                formatter={(value) => [`${value}/100`, 'Mention Score']}
              />
              <Bar dataKey="score">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
