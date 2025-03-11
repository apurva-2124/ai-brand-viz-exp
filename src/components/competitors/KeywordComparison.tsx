
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeywordItem {
  keyword: string;
  yourScore: number;
  competitorScore: number;
}

interface KeywordComparisonProps {
  title: string;
  description: string;
  keywords: KeywordItem[];
}

export const KeywordComparison = ({ title, description, keywords }: KeywordComparisonProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-muted-foreground">
          {description}
        </p>
        <ul className="divide-y">
          {keywords.map((item) => (
            <li key={item.keyword} className="py-3 flex justify-between">
              <span>{item.keyword}</span>
              <div className="flex items-center gap-2">
                <span className={item.yourScore > item.competitorScore ? "text-green-500" : "text-red-500"}>
                  {item.yourScore}
                </span>
                <span>vs</span>
                <span className={item.competitorScore > item.yourScore ? "text-green-500" : "text-red-500"}>
                  {item.competitorScore}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
