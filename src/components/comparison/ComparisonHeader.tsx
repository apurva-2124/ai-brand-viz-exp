
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ComparisonHeaderProps {
  selectedKeyword: string;
  keywords: string[];
  onKeywordChange: (keyword: string) => void;
  onCompare: () => void;
  isLoading: boolean;
  hasAiResult: boolean;
  useMockData: boolean;
  onToggleMockData: () => void;
  hideDataToggle?: boolean;
}

export const ComparisonHeader = ({
  selectedKeyword,
  keywords,
  onKeywordChange,
  onCompare,
  isLoading,
  hasAiResult,
  useMockData,
  onToggleMockData,
  hideDataToggle = false
}: ComparisonHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <CardTitle className="text-xl mb-2">AI vs. Traditional Search</CardTitle>
      <CardDescription className="mb-4">
        Compare how AI responds to search queries about your brand versus how your brand appears in traditional search results.
      </CardDescription>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center flex-1">
          <Select value={selectedKeyword} onValueChange={onKeywordChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Keyword" />
            </SelectTrigger>
            <SelectContent>
              {keywords.map((keyword) => (
                <SelectItem key={keyword} value={keyword}>
                  {keyword}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            onClick={onCompare}
            disabled={isLoading || !selectedKeyword || !hasAiResult}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Loading..." : "Compare Now"}
          </Button>
        </div>
        
        {!hideDataToggle && (
          <div className="flex items-center space-x-2">
            <Switch 
              id="use-mock-data" 
              checked={useMockData} 
              onCheckedChange={onToggleMockData} 
            />
            <Label htmlFor="use-mock-data">
              {useMockData ? "Using Static Data" : "Using Live Data"}
            </Label>
          </div>
        )}
      </div>
    </CardHeader>
  );
};
