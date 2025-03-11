
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandData } from "@/components/BrandTracker";
import { X } from "lucide-react";

interface BrandInputFormProps {
  onSubmit: (data: BrandData) => void;
}

const INDUSTRIES = [
  "Technology",
  "Retail & E-Commerce",
  "Healthcare & Pharma",
  "Finance & Insurance",
  "Education & E-Learning",
  "Entertainment & Media",
  "Food & Beverage",
  "Travel & Hospitality",
  "Automotive & Mobility",
  "B2B & Enterprise Services",
  "Consumer Goods & CPG",
  "Energy & Sustainability",
  "Real Estate & PropTech",
  "Legal & Compliance",
  "Other"
];

export const BrandInputForm = ({ onSubmit }: BrandInputFormProps) => {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [competitor, setCompetitor] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleAddCompetitor = () => {
    if (competitor.trim() && !competitors.includes(competitor.trim())) {
      setCompetitors([...competitors, competitor.trim()]);
      setCompetitor("");
    }
  };

  const handleRemoveCompetitor = (competitorToRemove: string) => {
    setCompetitors(competitors.filter(c => c !== competitorToRemove));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    
    if (brandName.trim() && industry && keywords.length > 0 && isEmailValid) {
      onSubmit({
        name: brandName.trim(),
        industry,
        description,
        website,
        email,
        keywords,
        competitors
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
          <Label htmlFor="email">Business Email <span className="text-muted-foreground text-sm">(for updates on your brand visibility)</span></Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            placeholder="your.name@company.com"
            required
            className={emailError ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Brand Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your brand (minimum 100 characters for better AI analysis)"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourbrand.com"
          />
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
        
        <div className="space-y-2">
          <Label>Competitor Brands</Label>
          <div className="flex space-x-2">
            <Input
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="Add a competitor"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCompetitor();
                }
              }}
            />
            <Button type="button" onClick={handleAddCompetitor}>Add</Button>
          </div>
          
          {competitors.length > 0 && (
            <div className="mt-3">
              <p className="text-sm mb-2">Added competitors:</p>
              <div className="flex flex-wrap gap-2">
                {competitors.map((comp) => (
                  <div 
                    key={comp} 
                    className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {comp}
                    <button
                      type="button"
                      onClick={() => handleRemoveCompetitor(comp)}
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
          disabled={!brandName.trim() || !industry || keywords.length === 0 || !email}
        >
          Start Tracking
        </Button>
      </form>
    </Card>
  );
};
