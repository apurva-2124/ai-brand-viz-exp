
import { Button } from "@/components/ui/button";

interface KeywordSelectorProps {
  keywords: string[];
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
}

export const KeywordSelector = ({ keywords, selectedKeyword, setSelectedKeyword }: KeywordSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Pick a Search Keyword (how users find this brand via traditional search engines)
      </label>
      <div className="flex gap-2 flex-wrap">
        {keywords.map(keyword => (
          <Button
            key={keyword}
            variant={keyword === selectedKeyword ? "default" : "outline"}
            onClick={() => setSelectedKeyword(keyword)}
            className="mb-2"
          >
            {keyword}
          </Button>
        ))}
      </div>
    </div>
  );
};
