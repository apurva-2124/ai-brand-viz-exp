
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QueryType } from "@/utils/queryTemplates";

// Define query types for the dropdown
const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "general", label: "General Query (Baseline)" },
  { value: "comparison", label: "Comparison Query" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
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
        onValueChange={(value: string) => setQueryType(value as QueryType)}
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
