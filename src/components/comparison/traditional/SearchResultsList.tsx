
import { SearchResult } from "@/services/traditional-search";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsListProps {
  results: SearchResult[];
}

export const SearchResultsList = ({ results }: SearchResultsListProps) => {
  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {results.map((result, index) => (
        <SearchResultItem key={`result-${result.rank}-${index}`} result={result} index={index} />
      ))}
    </div>
  );
};
