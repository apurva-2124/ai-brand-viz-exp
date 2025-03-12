
import { Check, X } from "lucide-react";

interface TraditionalResultsProps {
  comparisonData: any;
}

export const TraditionalResults = ({ comparisonData }: TraditionalResultsProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary">Traditional Search Results</h3>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Search Engine:</span> {comparisonData.searchEngine}
      </div>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Query:</span> {comparisonData.query}
      </div>
      <div className="text-sm mb-4">
        <span className="text-muted-foreground">Brand Mentions:</span> {comparisonData.brandMentions} times
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          {comparisonData.brandMentions > 0 ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {comparisonData.brandMentions > 0 ? 
              `Brand appears ${comparisonData.brandMentions} times` : 
              "Brand is not mentioned"}
          </span>
        </div>
        <div className="flex items-start gap-2">
          {comparisonData.topResults[0].position <= 3 ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-orange-600 mt-0.5" />
          }
          <span className="text-sm">
            {comparisonData.topResults[0].position <= 3 ? 
              "High ranking position" : 
              `Lower ranking (position #${comparisonData.topResults[0].position})`}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {comparisonData.topResults.map((result: any, index: number) => (
          <div key={index} className={`p-3 rounded text-sm ${result.hasBrandMention ? 'bg-secondary/30' : 'bg-secondary/10'}`}>
            <div className="font-medium mb-1">
              {result.title}
              {result.hasBrandMention && (
                <span className="text-xs ml-2 text-green-600">• Brand Mentioned</span>
              )}
            </div>
            <div className="text-muted-foreground text-xs mb-1">Position: #{result.position}</div>
            <div>{result.snippet}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
