
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandInputForm } from "@/components/BrandInputForm";
import { VisibilityDashboard } from "@/components/VisibilityDashboard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { Recommendations } from "@/components/Recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiSettings } from "@/components/ApiSettings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { saveBrandData } from "@/services/brandDatabase";
import { toast } from "sonner";

export interface BrandData {
  name: string;
  industry: string;
  keywords: string[];
  email: string;
  competitors?: string[];
  description?: string;
  website?: string;
  lastUpdated?: string;
  firstName: string;
  lastName: string;
}

export const BrandTracker = () => {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const openAIKey = localStorage.getItem("openai_api_key");
    const anthropicKey = localStorage.getItem("anthropic_api_key");
    setHasApiKeys(!!(openAIKey || anthropicKey));
  }, []);
  
  const handleBrandSubmit = async (data: BrandData) => {
    setIsSubmitting(true);
    
    try {
      const updatedData = {
        ...data,
        lastUpdated: new Date().toISOString()
      };
      
      const saveResult = await saveBrandData(updatedData);
      
      if (saveResult) {
        setBrandData(updatedData);
        toast.success("Brand information saved successfully!");
      } else {
        toast.error("Failed to save brand information. Please try again.");
      }
    } catch (error) {
      console.error("Error in brand submission:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ApiKeyPrompt = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Setup API Keys</CardTitle>
        <CardDescription>
          Connect your OpenAI and/or Anthropic API keys to get real AI visibility data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          No API keys detected. You can still use the app with simulated data, 
          or add your API keys for real AI analysis.
        </p>
        <ApiSettings />
      </CardContent>
    </Card>
  );

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => window.location.reload()}
        >
          <ArrowLeft className="h-4 w-4" />
          Start Over
        </Button>
      </div>
      
      {!brandData ? (
        <>
          {!hasApiKeys && <ApiKeyPrompt />}
          <BrandInputForm onSubmit={handleBrandSubmit} isSubmitting={isSubmitting} />
        </>
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Brand: {brandData.name}</h2>
              <p className="text-muted-foreground">Industry: {brandData.industry}</p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(brandData.lastUpdated || "").toLocaleString()}
              </p>
            </div>
            {!hasApiKeys && (
              <ApiSettings />
            )}
          </div>
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Visibility Dashboard</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <VisibilityDashboard brandData={brandData} />
            </TabsContent>
            
            <TabsContent value="competitors">
              <CompetitorAnalysis brandData={brandData} />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Recommendations brandData={brandData} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </Container>
  );
};
