
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiVisibility";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
import { useState } from "react";

const SAMPLE_BRANDS = [
  { name: "Apple", industry: "Technology" },
  { name: "Nike", industry: "Retail & Fashion" },
  { name: "Tesla", industry: "Automotive" },
  { name: "Coca-Cola", industry: "Beverages" },
  { name: "Amazon", industry: "E-commerce" }
];

export const BrandExplorer = () => {
  const [selectedBrand, setSelectedBrand] = useState(SAMPLE_BRANDS[0]);
  const [provider, setProvider] = useState<AIProvider>("openai");

  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Brand Explorer</h2>
          <p className="text-muted-foreground">
            Select a brand and AI model to see how artificial intelligence interprets brand perception
          </p>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Brand</label>
              <Select 
                value={selectedBrand.name}
                onValueChange={(value) => setSelectedBrand(
                  SAMPLE_BRANDS.find(b => b.name === value) || SAMPLE_BRANDS[0]
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a brand" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_BRANDS.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {brand.name} ({brand.industry})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select AI Model</label>
              <Select
                value={provider}
                onValueChange={(value) => setProvider(value as AIProvider)}
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
          </div>

          <AIvsTraditionalComparison
            brandData={{
              name: selectedBrand.name,
              industry: selectedBrand.industry,
              keywords: ["brand perception", "market position", "consumer sentiment"],
              email: "",
              firstName: "",
              lastName: ""
            }}
            aiResults={null}
          />
        </Card>
      </div>
    </Container>
  );
};
