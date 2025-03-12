
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchQueriesCardProps {
  queries: Array<{
    keyword: string;
    query: string;
  }>;
}

export const SearchQueriesCard = ({ queries }: SearchQueriesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Search Queries</CardTitle>
        <CardDescription>
          How AI understands search: We translate your industry, brand and keyword inputs into a conversational query users might ask an AI model. This helps evaluate how well AI search represents your brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {queries.map((item, index) => (
            <div key={index} className="border rounded-md p-3 bg-secondary/20">
              <div className="text-xs text-muted-foreground mb-1">Keyword:</div>
              <div className="font-medium mb-2">{item.keyword}</div>
              <div className="text-xs text-muted-foreground mb-1">Transformed Query:</div>
              <div className="text-sm">{item.query}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
