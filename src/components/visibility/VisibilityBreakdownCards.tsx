
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

interface VisibilityBreakdownCardsProps {
  overallScore: number;
  prominentMentions: number;
  vagueMentions: number;
  notFound: number;
  competitorsDetected: Record<string, number>;
}

export const VisibilityBreakdownCards = ({ 
  overallScore, 
  prominentMentions, 
  vagueMentions, 
  notFound,
  competitorsDetected 
}: VisibilityBreakdownCardsProps) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall AI Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-secondary text-3xl font-bold">
              {overallScore}
            </div>
            <p className="mt-2 text-muted-foreground">out of 100</p>
          </div>
          <Progress 
            value={overallScore} 
            className={`h-2 mt-4 ${getScoreColor(overallScore)}`} 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                High Visibility:
              </span>
              <span className="font-medium">{prominentMentions}</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                Needs Optimization:
              </span>
              <span className="font-medium">{vagueMentions}</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                Missing from Results:
              </span>
              <span className="font-medium">{notFound}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitor Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted-foreground">
            How often competitors appear in AI responses
          </p>
          {Object.keys(competitorsDetected || {}).length > 0 ? (
            <div className="mt-3">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart 
                  data={Object.entries(competitorsDetected || {}).map(([name, count]) => ({
                    name,
                    count
                  }))}
                  layout="vertical"
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide={true} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill="#8884d8" 
                    name="Mentions"
                    label={{ 
                      position: 'right',
                      formatter: (value: any) => value
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">No competitors detected in responses</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
