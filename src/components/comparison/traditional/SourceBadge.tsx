
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, Search, FileText } from "lucide-react";
import { getGoogleRankingBadge } from "@/components/visibility/analysis/StatusBadges";

interface SourceBadgeProps {
  source: "serpapi" | "mock" | "proxy" | "static";
  rank?: number;
  showRank?: boolean;
}

export const SourceBadge = ({ source, rank, showRank = false }: SourceBadgeProps) => {
  // Google ranking badge if requested
  if (showRank && rank !== undefined) {
    return getGoogleRankingBadge(rank);
  }

  // Source badges
  if (source === "serpapi") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
              Live Data (SerpAPI)
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">Real-time Google search results retrieved via SerpApi.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else if (source === "mock") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded ml-2 flex items-center">
              <Database className="h-3 w-3 mr-1" />
              Demo Data
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">Generated demonstration data for testing and development.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else if (source === "proxy") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2 flex items-center">
              <Search className="h-3 w-3 mr-1" />
              Live Web Search
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">Real-time Google search results retrieved via proxy.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return null;
};
