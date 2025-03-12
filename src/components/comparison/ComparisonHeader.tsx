
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BrandData } from "@/components/BrandTracker";

interface ComparisonHeaderProps {
  selectedKeyword: string;
  keywords: string[];
  onKeywordChange: (value: string) => void;
  onCompare: () => void;
  isLoading: boolean;
  hasAiResult: boolean;
}

export const ComparisonHeader = ({
  selectedKeyword,
  keywords,
  onKeywordChange,
  onCompare,
  isLoading,
  hasAiResult,
}: ComparisonHeaderProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>AI vs. Traditional Search Comparison</CardTitle>
        <CardDescription>
          See how your brand appears in AI-powered search responses compared to traditional search engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select 
              value={selectedKeyword} 
              onValueChange={onKeywordChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a keyword" />
              </SelectTrigger>
              <SelectContent>
                {keywords.map((keyword) => (
                  <SelectItem key={keyword} value={keyword}>
                    {keyword}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={onCompare} 
            disabled={isLoading || !hasAiResult}
            className="whitespace-nowrap"
          >
            {isLoading ? "Loading..." : "Compare Results"}
          </Button>
        </div>
      </CardContent>
    </>
  );
};
