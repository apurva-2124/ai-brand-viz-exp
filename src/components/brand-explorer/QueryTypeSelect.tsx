
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QueryType } from "@/utils/queryTransformer";

// Define query types for the dropdown
const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "best-in-class", label: "Best-in-Class (Category-Level)" },
  { value: "feature-specific", label: "Feature-Specific" },
  { value: "comparison", label: "Comparison Query" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "transactional", label: "Transactional Intent" },
  { value: "ai-summarized", label: "AI Summarized Answer Query" },
  { value: "localized", label: "Localized Query (Location-Based)" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "industry-trend", label: "Industry Trend Query (Thought Leadership)" },
];

interface QueryTypeSelectProps {
  queryType: QueryType;
  setQueryType: (type: QueryType) => void;
}

export const QueryTypeSelect = ({ queryType, setQueryType }: QueryTypeSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select Query Type</label>
      <Select
        value={queryType}
        onValueChange={(value) => setQueryType(value as QueryType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose query type" />
        </SelectTrigger>
        <SelectContent>
          {QUERY_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
