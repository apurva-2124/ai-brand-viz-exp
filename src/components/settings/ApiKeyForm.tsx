
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export interface ApiKeyFormProps {
  onClose: () => void;
}

export const ApiKeyForm = ({ onClose }: ApiKeyFormProps) => {
  const [openAIKey, setOpenAIKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedOpenAIKey = localStorage.getItem("openai_api_key") || "";
    const savedAnthropicKey = localStorage.getItem("anthropic_api_key") || "";
    const savedGeminiKey = localStorage.getItem("gemini_api_key") || "";
    
    setOpenAIKey(savedOpenAIKey);
    setAnthropicKey(savedAnthropicKey);
    setGeminiKey(savedGeminiKey);
  }, []);

  const saveSettings = () => {
    if (anthropicKey && !anthropicKey.startsWith('sk-ant-')) {
      toast({
        title: "Invalid Anthropic API Key",
        description: "Anthropic API keys should start with 'sk-ant-'",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem("openai_api_key", openAIKey);
    localStorage.setItem("anthropic_api_key", anthropicKey);
    localStorage.setItem("gemini_api_key", geminiKey);
    
    // Dispatch a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Settings Saved",
      description: "Your API keys have been saved successfully.",
    });
    
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Your API Keys</h3>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Your API keys are stored only in your browser's local storage and never transmitted to our servers. They're used solely to make API requests directly from your browser.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">OpenAI API Key</label>
          <Input
            type="password"
            placeholder="sk-..."
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Anthropic API Key</label>
          <Input
            type="password"
            placeholder="sk-ant-..."
            value={anthropicKey}
            onChange={(e) => setAnthropicKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Anthropic API keys must start with <code className="bg-blue-100 px-1 py-0.5 rounded">sk-ant-</code>
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Google Gemini API Key</label>
          <Input
            type="password"
            placeholder="AI..."
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
          />
        </div>
      </div>
      
      <Button className="w-full" onClick={saveSettings}>
        Save API Keys
      </Button>
    </div>
  );
};
