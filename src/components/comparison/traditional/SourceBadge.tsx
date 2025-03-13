
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, Search } from "lucide-react";

interface SourceBadgeProps {
  source: "serpapi" | "mock" | "proxy";
}

export const SourceBadge = ({ source }: SourceBadgeProps) => {
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
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2 flex items-center">
              <Database className="h-3 w-3 mr-1" />
              Mock Data
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">Generated mock data for testing and development.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else if (source === "proxy") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded ml-2 flex items-center">
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
