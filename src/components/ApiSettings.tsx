
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Settings, Info, Shield, ArrowUpRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ApiSettings = () => {
  const [openAIKey, setOpenAIKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("guide");
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys to analyze brand visibility in AI responses.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="guide">Getting Started</TabsTrigger>
            <TabsTrigger value="keys">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guide" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Getting Started with API Keys</h3>
              </div>
              
              <p className="text-muted-foreground">
                This experiment requires AI model API keys to generate responses about brands and industries. Once generated, you can compare these AI descriptions with actual Google search results.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-slate-700" />
                  <h4 className="font-medium">What you need:</h4>
                </div>
                
                <ul className="list-disc ml-6 space-y-1">
                  <li>OpenAI API Key (for GPT models)</li>
                  <li>Anthropic API Key (for Claude models)</li>
                  <li>Google AI Studio API Key (for Gemini models)</li>
                </ul>
              </div>
              
              <h4 className="font-medium">How to get them:</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h5 className="font-semibold mb-2">OpenAI</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create an account and generate an API key from the OpenAI platform.
                    </p>
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full" size="sm">
                        Get Key
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h5 className="font-semibold mb-2">Anthropic</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign up for Anthropic's Claude API access and create an API key.
                    </p>
                    <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full" size="sm">
                        Get Key
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h5 className="font-semibold mb-2">Google AI Studio</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a Google AI Studio account and generate an API key.
                    </p>
                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full" size="sm">
                        Get Key
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <Alert className="bg-amber-50 border-amber-200">
                <Shield className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Your API keys are stored only in your browser's local storage and never transmitted to our servers. They're used solely to make API requests directly from your browser.
                </AlertDescription>
              </Alert>
              
              <div className="bg-slate-50 p-4 rounded-lg border mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-slate-700" />
                  <h4 className="font-medium">Why we need these keys:</h4>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  This experiment explores how different AI models describe brands and industries. After generating AI responses, you can easily compare them with web search results by clicking a Google Search button. Since API calls cost money, we require you to use your own API keys rather than sharing a single key across all users.
                </p>
              </div>
            </div>
            
            <Button className="w-full mt-6" onClick={() => setActiveTab("keys")}>
              Continue to API Keys
            </Button>
          </TabsContent>
          
          <TabsContent value="keys" className="space-y-6">
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
            
            <Button className="w-full mt-4" onClick={saveSettings}>
              Save API Keys
            </Button>
            
            <Button variant="outline" className="w-full" onClick={() => setActiveTab("guide")}>
              Back to Getting Started
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
