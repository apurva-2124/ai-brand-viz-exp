
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Eye, ChevronUp, ChevronDown, AlertCircle } from "lucide-react";
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { useState } from "react";

interface CollapsibleResultsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const CollapsibleResultsSection = ({
  isOpen,
  onOpenChange,
  title,
  children
}: CollapsibleResultsProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange} className="border rounded-lg">
      <div className="flex items-center justify-between w-full p-4 text-left bg-secondary/20">
        <h4 className="font-medium">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> View {title}
            {isOpen ? 
              <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            }
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="p-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface ResultsContainerProps {
  aiResult: any;
  comparisonData: any;
  brandName: string;
}

export const CollapsibleResults = ({ aiResult, comparisonData, brandName }: ResultsContainerProps) => {
  const [isAIResultsOpen, setIsAIResultsOpen] = useState(false);
  const [isTraditionalResultsOpen, setIsTraditionalResultsOpen] = useState(false);
  
  // Check if we have valid AI results (detect proxy error responses)
  const hasValidAiResult = aiResult && aiResult.response && 
    !aiResult.response.includes("Proxy server") && 
    !aiResult.response.includes("timed out") && 
    !aiResult.response.includes("Failed to fetch") &&
    !aiResult.response.includes("USING MOCK DATA");
  
  // Check if we have valid traditional results with URLs
  const hasValidTraditionalResults = comparisonData && 
    Array.isArray(comparisonData.topResults) && 
    comparisonData.topResults.length > 0 &&
    comparisonData.topResults.some(result => result.url && !result.url.includes("example.com"));
  
  return (
    <>
      <CollapsibleResultsSection 
        isOpen={isAIResultsOpen} 
        onOpenChange={setIsAIResultsOpen}
        title="Full AI Search Results"
      >
        {hasValidAiResult ? (
          <AIResults aiResult={{
            ...aiResult, 
            brandName,
          }} />
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">No AI results available right now</p>
              <p className="text-sm mt-1">The AI service is temporarily unavailable. Please try again later.</p>
            </div>
          </div>
        )}
      </CollapsibleResultsSection>
      
      <CollapsibleResultsSection 
        isOpen={isTraditionalResultsOpen} 
        onOpenChange={setIsTraditionalResultsOpen}
        title="Full Traditional Search Results"
      >
        {hasValidTraditionalResults ? (
          <TraditionalResults comparisonData={{
            ...comparisonData, 
            brandMentions: aiResult.googleMentionCount || comparisonData.brandMentions
          }} />
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">No traditional search results available right now</p>
              <p className="text-sm mt-1">Search results could not be retrieved at this time. Please try again later.</p>
            </div>
          </div>
        )}
      </CollapsibleResultsSection>
    </>
  );
};
