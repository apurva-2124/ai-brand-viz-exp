import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ApiSettings = () => {
  const [openAIKey, setOpenAIKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedOpenAIKey = localStorage.getItem("openai_api_key") || "";
    const savedAnthropicKey = localStorage.getItem("anthropic_api_key") || "";
    
    setOpenAIKey(savedOpenAIKey);
    setAnthropicKey(savedAnthropicKey);
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
    
    toast({
      title: "Settings Saved",
      description: "Your API keys have been saved successfully.",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys to analyze brand visibility in AI responses.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenAI API Key</label>
            <Input
              type="password"
              placeholder="sk-..."
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a>
            </p>
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
              Get your API key from <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="underline">Anthropic</a>
            </p>
            <Alert variant="info" className="border-blue-200">
              <AlertDescription className="text-xs">
                Anthropic API keys must start with <code className="bg-blue-100 px-1 py-0.5 rounded">sk-ant-</code> 
                and be pasted exactly as shown in your Anthropic console.
              </AlertDescription>
            </Alert>
          </div>
          <Button className="w-full" onClick={saveSettings}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
