
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ContentStrategy {
  title: string;
  description: string;
  example: string;
}

interface ContentStrategyCardProps {
  contentStrategies: ContentStrategy[];
}

export const ContentStrategyCard = ({ contentStrategies }: ContentStrategyCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Strategy</CardTitle>
        <CardDescription>
          Strategic content changes to maximize AI visibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {contentStrategies.map((strategy: ContentStrategy, index: number) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h4 className="font-semibold mb-2">{strategy.title}</h4>
              <p className="text-muted-foreground mb-3">{strategy.description}</p>
              <div className="bg-secondary/50 p-3 rounded-md">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic">{strategy.example}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
