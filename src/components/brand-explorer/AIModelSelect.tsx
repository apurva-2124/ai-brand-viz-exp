
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/ai/types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AIModelSelectProps {
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
}

export const AIModelSelect = ({ provider, setProvider }: AIModelSelectProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium">AI Model</label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Using OpenAI's GPT-4 model via proxy service</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
