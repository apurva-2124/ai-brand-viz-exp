
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Settings, AlertTriangle, Zap, Globe, BarChart, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export const ApiSettings = () => {
  const [openAIKey, setOpenAIKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [googleAdsKey, setGoogleAdsKey] = useState("");
  const [semrushKey, setSemrushKey] = useState("");
  const [ahrefsKey, setAhrefsKey] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedOpenAIKey = localStorage.getItem("openai_api_key") || "";
    const savedAnthropicKey = localStorage.getItem("anthropic_api_key") || "";
    const savedGeminiKey = localStorage.getItem("gemini_api_key") || "";
    const savedGoogleAdsKey = localStorage.getItem("google_ads_api_key") || "";
    const savedSemrushKey = localStorage.getItem("semrush_api_key") || "";
    const savedAhrefsKey = localStorage.getItem("ahrefs_api_key") || "";
    
    setOpenAIKey(savedOpenAIKey);
    setAnthropicKey(savedAnthropicKey);
    setGeminiKey(savedGeminiKey);
    setGoogleAdsKey(savedGoogleAdsKey);
    setSemrushKey(savedSemrushKey);
    setAhrefsKey(savedAhrefsKey);
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
    localStorage.setItem("google_ads_api_key", googleAdsKey);
    localStorage.setItem("semrush_api_key", semrushKey);
    localStorage.setItem("ahrefs_api_key", ahrefsKey);
    
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
            Configure your API keys to analyze brand visibility in AI responses and integrate with marketing tools.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai">AI Models</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4 py-4">
            <div className="space-y-4">
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
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Gemini API Key</label>
                <Input
                  type="password"
                  placeholder="AI..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-4 py-4">
            <Card className="mb-4 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Lock className="h-10 w-10 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Marketing Tool Integrations</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Unlock marketing tool integrations with our AI Brand Visibility Optimization Toolkit or higher plans
                    </p>
                    <Link to="/optimize" className="inline-block">
                      <Button className="w-full">
                        Upgrade to Access Marketing Tools
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Alert variant="default" className="mb-4 opacity-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Marketing tool integrations are in beta. Some features may be limited.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4 opacity-50 pointer-events-none">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Google Ads API Key
                </label>
                <Input
                  type="password"
                  placeholder="Enter Google Ads API key"
                  value={googleAdsKey}
                  onChange={(e) => setGoogleAdsKey(e.target.value)}
                  disabled
                />
                <p className="text-xs text-muted-foreground ml-6">
                  Track how AI-driven responses impact your paid search performance.
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  SEMrush API Key
                </label>
                <Input
                  type="password"
                  placeholder="Enter SEMrush API key"
                  value={semrushKey}
                  onChange={(e) => setSemrushKey(e.target.value)}
                  disabled
                />
                <p className="text-xs text-muted-foreground ml-6">
                  Compare AI search rankings with traditional SEO data.
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-green-500" />
                  Ahrefs API Key
                </label>
                <Input
                  type="password"
                  placeholder="Enter Ahrefs API key"
                  value={ahrefsKey}
                  onChange={(e) => setAhrefsKey(e.target.value)}
                  disabled
                />
                <p className="text-xs text-muted-foreground ml-6">
                  Analyze backlinks that influence AI-generated citations.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button className="w-full mt-4" onClick={saveSettings}>
          Save All Settings
        </Button>
      </DialogContent>
    </Dialog>
  );
};
