
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/ai/types";

interface AIModelSelectProps {
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
}

export const AIModelSelect = ({ provider, setProvider }: AIModelSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select AI Model</label>
      <Select
        value="openai"
        onValueChange={() => {}}
        disabled={true}
      >
        <SelectTrigger>
          <SelectValue placeholder="OpenAI (GPT-4)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
