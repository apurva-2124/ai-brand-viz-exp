
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
}

export const ComparisonResults = ({ aiResult, comparisonData }: ComparisonResultsProps) => {
  if (!aiResult || !comparisonData) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <AIResults aiResult={aiResult} />
      <TraditionalResults comparisonData={comparisonData} />
    </div>
  );
};
