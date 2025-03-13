
import { Check, X } from "lucide-react";
import { SearchResult } from "@/services/traditional-search";

interface BrandMetricsProps {
  brandMentions: number;
  topResults: SearchResult[];
}

export const BrandMetrics = ({ brandMentions, topResults }: BrandMetricsProps) => {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-start gap-2">
        {brandMentions > 0 ? 
          <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
          <X className="h-4 w-4 text-red-600 mt-0.5" />
        }
        <span className="text-sm">
          {brandMentions > 0 ? 
            `Brand appears ${brandMentions} times` : 
            "Brand is not mentioned"}
        </span>
      </div>
      
      <div className="flex items-start gap-2">
        {topResults[0]?.hasBrandMention ? 
          <Check className="h-4 w-4 text-green-600 mt-0.5" /> : 
          topResults.some(r => r.hasBrandMention) ?
            <Check className="h-4 w-4 text-yellow-600 mt-0.5" /> :
            <X className="h-4 w-4 text-red-600 mt-0.5" />
        }
        <span className="text-sm">
          {topResults[0]?.hasBrandMention ? 
            "Brand appears in top result" : 
            topResults.some(r => r.hasBrandMention) ?
              `Brand appears in position #${topResults.findIndex(r => r.hasBrandMention) + 1}` :
              "Brand not found in top results"}
        </span>
      </div>
    </div>
  );
};
