
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
        value={provider}
        onValueChange={(value: string) => setProvider(value as AIProvider)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose an AI model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
          <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
          <SelectItem value="gemini">Google (Gemini)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
