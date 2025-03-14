
import { Map, Globe, BookOpen, Newspaper, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchResult } from "@/services/traditional-search";

interface SearchResultItemProps {
  result: SearchResult;
  index: number;
}

export const SearchResultItem = ({ result, index }: SearchResultItemProps) => {
  // Helper function to get the appropriate icon for result type
  const getResultTypeIcon = (resultType?: string) => {
    switch(resultType) {
      case 'local':
        return <Map className="h-3 w-3" />;
      case 'organic':
        return <Globe className="h-3 w-3" />;
      case 'knowledge_graph':
        return <BookOpen className="h-3 w-3" />;
      case 'news':
        return <Newspaper className="h-3 w-3" />;
      default:
        return <Globe className="h-3 w-3" />;
    }
  };

  // Helper function to get badge text for result type
  const getResultTypeLabel = (resultType?: string) => {
    switch(resultType) {
      case 'local':
        return 'Local Business';
      case 'organic':
        return 'Website';
      case 'knowledge_graph':
        return 'Knowledge Panel';
      case 'news':
        return 'News';
      default:
        return 'Website';
    }
  };

  // Format title to make it more readable for display
  const formatTitle = (title: string) => {
    // Remove common suffixes that make titles look cluttered
    return title
      .replace(/ \| Search Results$/, '')
      .replace(/ \- .*$/, '');
  };

  return (
    <div className={`p-3 rounded text-sm ${result.hasBrandMention ? 'bg-secondary/30' : 'bg-secondary/10'}`}>
      <div className="font-medium mb-1 flex items-center justify-between">
        <div className="break-words pr-2">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 flex items-center gap-1">
            {result.title}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        {result.hasBrandMention && (
          <span className="text-xs whitespace-nowrap text-green-600">• Brand Mentioned</span>
        )}
      </div>
      <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
        <span>Position: #{result.rank}</span>
        <span className="mx-1">•</span>
        <Badge variant="outline" className="h-5 px-1 flex items-center gap-1 text-xs">
          {getResultTypeIcon(result.resultType)}
          <span>{getResultTypeLabel(result.resultType)}</span>
        </Badge>
      </div>
      <div className="text-xs text-blue-600 mb-1 truncate">{result.url}</div>
      <div>{result.description}</div>
    </div>
  );
};
