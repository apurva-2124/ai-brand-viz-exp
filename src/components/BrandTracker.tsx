
import { useState } from "react";
import { Container } from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandInputForm } from "@/components/BrandInputForm";
import { VisibilityDashboard } from "@/components/VisibilityDashboard";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { Recommendations } from "@/components/Recommendations";

export interface BrandData {
  name: string;
  industry: string;
  keywords: string[];
  lastUpdated?: string;
}

export const BrandTracker = () => {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  
  const handleBrandSubmit = (data: BrandData) => {
    // Add timestamp
    const updatedData = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    setBrandData(updatedData);
  };

  return (
    <Container className="py-8">
      {!brandData ? (
        <BrandInputForm onSubmit={handleBrandSubmit} />
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Brand: {brandData.name}</h2>
            <p className="text-muted-foreground">Industry: {brandData.industry}</p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(brandData.lastUpdated || "").toLocaleString()}
            </p>
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
