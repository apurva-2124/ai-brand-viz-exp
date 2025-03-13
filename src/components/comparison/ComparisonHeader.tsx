
import { useState } from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, ArrowRight, Database, Cloud } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ComparisonHeaderProps {
  selectedKeyword: string;
  keywords: string[];
  onKeywordChange: (keyword: string) => void;
  onCompare: () => void;
  isLoading: boolean;
  hasAiResult: boolean;
  useMockData?: boolean;
  onToggleMockData?: () => void;
}

export const ComparisonHeader = ({ 
  selectedKeyword, 
  keywords, 
  onKeywordChange, 
  onCompare, 
  isLoading,
  hasAiResult,
  useMockData = false,
  onToggleMockData
}: ComparisonHeaderProps) => {
  const [selectedValue, setSelectedValue] = useState(selectedKeyword);
  
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onKeywordChange(value);
  };
  
  return (
    <CardHeader>
      <CardTitle className="text-xl flex items-center justify-between">
        <span>AI vs Traditional Search Comparison</span>
        
        {onToggleMockData && (
          <div className="flex items-center space-x-2">
            <Switch 
              id="mock-data" 
              checked={useMockData} 
              onCheckedChange={onToggleMockData} 
            />
            <Label htmlFor="mock-data" className="text-sm font-normal flex items-center">
              {useMockData ? 
                <Database className="h-4 w-4 mr-1" /> : 
                <Cloud className="h-4 w-4 mr-1" />
              }
              {useMockData ? "Using Mock Data" : "Using Live API"}
            </Label>
          </div>
        )}
      </CardTitle>
      
      <CardDescription>
        Compare how your brand appears in AI responses vs. traditional search results
      </CardDescription>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <div className="w-full sm:w-2/3">
          <Select 
            value={selectedValue} 
            onValueChange={handleSelectChange}
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
          disabled={isLoading || !selectedValue || !hasAiResult}
          className="w-full sm:w-1/3"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              Compare
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {!hasAiResult && (
        <div className="flex items-center mt-3 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          Run AI analysis first to enable comparison
        </div>
      )}
    </CardHeader>
  );
};
