
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "Before Optimization",
    visibility: 24,
    mentions: 12,
    conversions: 8,
  },
  {
    name: "After Optimization",
    visibility: 78,
    mentions: 65,
    conversions: 42,
  },
];

export const OptimizationCaseStudy = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-4">Case Study: NatureCare Skincare</h3>
        <p className="text-lg mb-6">
          NatureCare was struggling to appear in AI search results despite having strong SEO for traditional search engines.
        </p>
        <div className="space-y-4">
          <div className="bg-background p-4 rounded-lg">
            <p className="font-semibold mb-2">The Challenge:</p>
            <p className="text-muted-foreground">
              ChatGPT and other AI tools rarely mentioned NatureCare when users asked about "natural skincare brands." Their visibility score was only 24/100.
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <p className="font-semibold mb-2">Our Solution:</p>
            <p className="text-muted-foreground">
              We implemented our AI Content Optimization Toolkit and AI-Optimized FAQ structure, with strategic schema markup to enhance their content for AI discovery.
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <p className="font-semibold mb-2">The Results:</p>
            <p className="text-muted-foreground">
              NatureCare's AI visibility score increased to 78/100. Brand mentions in AI responses grew by 440%, and website traffic from users citing "AI recommended this brand" increased by 325%.
            </p>
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="AI Visibility Score" dataKey="visibility" fill="#1E40AF" />
                <Bar name="AI Mentions" dataKey="mentions" fill="#6366F1" />
                <Bar name="Conversions" dataKey="conversions" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
