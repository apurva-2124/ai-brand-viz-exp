
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Eye, ChevronUp, ChevronDown } from "lucide-react";
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
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-secondary/20">
        <h4 className="font-medium">{title}</h4>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" /> View {title}
          {isOpen ? 
            <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          }
        </Button>
      </CollapsibleTrigger>
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
  
  return (
    <>
      <CollapsibleResultsSection 
        isOpen={isAIResultsOpen} 
        onOpenChange={setIsAIResultsOpen}
        title="Full AI Search Results"
      >
        <AIResults aiResult={{
          ...aiResult, 
          brandName,
        }} />
      </CollapsibleResultsSection>
      
      <CollapsibleResultsSection 
        isOpen={isTraditionalResultsOpen} 
        onOpenChange={setIsTraditionalResultsOpen}
        title="Full Traditional Search Results"
      >
        <TraditionalResults comparisonData={{
          ...comparisonData, 
          brandMentions: aiResult.googleMentionCount || comparisonData.brandMentions
        }} />
      </CollapsibleResultsSection>
    </>
  );
};
