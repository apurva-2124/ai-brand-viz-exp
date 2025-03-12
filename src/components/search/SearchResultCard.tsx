
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, BookOpen, Newspaper, ExternalLink } from "lucide-react";
import { SearchResult } from "./types";

interface SearchResultCardProps {
  result: SearchResult;
}

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  // Determine the result type icon
  const getResultTypeIcon = () => {
    switch (result.resultType) {
      case "local":
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case "knowledge_graph":
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case "news":
        return <Newspaper className="h-4 w-4 text-green-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getResultTypeIcon()}
              <Badge variant="outline" className="text-xs font-normal">
                {result.resultType ? result.resultType.replace("_", " ") : "organic"}
              </Badge>
              {result.position && (
                <span className="text-xs text-muted-foreground">Position: {result.position}</span>
              )}
            </div>
            
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center hover:underline"
            >
              <h3 className="font-medium text-lg text-primary group-hover:text-primary/80">
                {result.title}
              </h3>
              <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:opacity-100" />
            </a>
            
            <p className="text-xs text-blue-600 truncate mt-1">{result.url}</p>
            <p className="mt-2 text-sm text-muted-foreground">{result.description}</p>
            
            {result.date && (
              <p className="text-xs text-muted-foreground mt-2">
                Published: {result.date}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
