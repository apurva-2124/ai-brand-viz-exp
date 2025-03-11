
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandData } from "@/components/BrandTracker";
import { X } from "lucide-react";

interface BrandInputFormProps {
  onSubmit: (data: BrandData) => void;
}

const INDUSTRIES = [
  "Technology",
  "Retail",
  "Healthcare",
  "Finance",
  "Education",
  "Entertainment",
  "Food & Beverage",
  "Other"
];

export const BrandInputForm = ({ onSubmit }: BrandInputFormProps) => {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (brandName.trim() && industry && keywords.length > 0) {
      onSubmit({
        name: brandName.trim(),
        industry,
        keywords
      });
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Enter Your Brand Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brandName">Brand Name</Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter your brand name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry} required>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((ind) => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Keywords to Track</Label>
          <div className="flex space-x-2">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Add a keyword"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
            />
            <Button type="button" onClick={handleAddKeyword}>Add</Button>
          </div>
          
          {keywords.length > 0 && (
            <div className="mt-3">
              <p className="text-sm mb-2">Added keywords:</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <div 
                    key={kw} 
                    className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={!brandName.trim() || !industry || keywords.length === 0}
        >
          Start Tracking
        </Button>
      </form>
    </Card>
  );
};
