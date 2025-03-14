
import { Check, X } from "lucide-react";

interface AIResultsProps {
  aiResult: any;
}

export const AIResults = ({ aiResult }: AIResultsProps) => {
  // Use the hasBrandMention and isProminent values from the processed result
  // Fall back to calculating them only if they're not provided
  const hasBrandMention = typeof aiResult.hasBrandMention === 'boolean' 
    ? aiResult.hasBrandMention 
    : aiResult.brandMentionCount > 0;
  
  const isProminent = typeof aiResult.isProminent === 'boolean'
    ? aiResult.isProminent
    : false; // Don't assume prominence if not explicitly set

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3 text-primary">AI Search Results</h3>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Query:</span> {aiResult.query}
      </div>
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">Provider:</span> {aiResult.provider}
      </div>
      <div className={`text-sm px-2 py-1 rounded inline-flex mb-4 ${
        isProminent 
          ? "bg-green-100 text-green-800" 
          : hasBrandMention 
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
      }`}>
        {isProminent 
          ? "Prominently Featured" 
          : hasBrandMention 
            ? "Mentioned" 
            : "Not Found"}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          {hasBrandMention ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {hasBrandMention ? 
              `Brand is mentioned ${aiResult.brandMentionCount ? `${aiResult.brandMentionCount} times` : ""}` : 
              "Brand is missing"}
          </span>
        </div>
        <div className="flex items-start gap-2">
          {isProminent ? 
            <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
            <X className="h-4 w-4 text-red-600 mt-0.5" />
          }
          <span className="text-sm">
            {isProminent ? "Prominently featured" : "Not prominently featured"}
          </span>
        </div>
        {aiResult.competitorAnalysis?.competitorsFound?.length > 0 && (
          <div className="flex items-start gap-2">
            <X className="h-4 w-4 text-orange-600 mt-0.5" />
            <span className="text-sm">
              Competitors mentioned: {aiResult.competitorAnalysis.competitorsFound.join(', ')}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-secondary/30 p-3 rounded text-sm max-h-80 overflow-y-auto">
        {aiResult.response}
      </div>
    </div>
  );
};
