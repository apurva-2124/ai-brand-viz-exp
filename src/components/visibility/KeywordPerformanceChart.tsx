
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface KeywordPerformanceChartProps {
  keywordStrength: Array<{ keyword: string; score: number }>;
}

export const KeywordPerformanceChart = ({ keywordStrength }: KeywordPerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={keywordStrength}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="keyword" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
              />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="score" name="Visibility Score">
                {keywordStrength.map((entry, index) => {
                  const color = entry.score >= 7 
                    ? "#22c55e" // green
                    : entry.score >= 4 
                      ? "#eab308" // yellow
                      : "#ef4444"; // red
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
