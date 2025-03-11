
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandData } from "@/components/BrandTracker";
import { analyzeAIVisibility, AIProvider } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTransformer";
import { generateMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface VisibilityDashboardProps {
  brandData: BrandData;
}

const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "best-in-class", label: "Best-in-Class (Category-Level)" },
  { value: "feature-specific", label: "Feature-Specific" },
  { value: "comparison", label: "Comparison Query" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "transactional", label: "Transactional Intent" },
  { value: "ai-summarized", label: "AI Summarized Answer Query" },
  { value: "localized", label: "Localized Query (Location-Based)" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "industry-trend", label: "Industry Trend Query (Thought Leadership)" },
];

export const VisibilityDashboard = ({ brandData }: VisibilityDashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibilityData, setVisibilityData] = useState<any>(null);
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [queryType, setQueryType] = useState<QueryType>("best-in-class");
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if API keys are set
      const openAIKey = localStorage.getItem("openai_api_key");
      const anthropicKey = localStorage.getItem("anthropic_api_key");
      
      // Determine if we should use mock data
      const shouldUseMockData = 
        useMockData || 
        (provider === "openai" && !openAIKey) || 
        (provider === "anthropic" && !anthropicKey) ||
        (provider === "both" && (!openAIKey || !anthropicKey));
      
      let data;
      
      if (shouldUseMockData) {
        // Use mock data if no API keys or mock data is requested
        data = generateMockData(brandData);
        toast({
          title: "Using mock data",
          description: provider !== "both" 
            ? `No API key found for ${provider}. Using simulated data instead.` 
            : "Missing API keys. Using simulated data instead.",
        });
      } else {
        // Use real API data with the selected query type
        data = await analyzeAIVisibility(brandData, provider, queryType);
      }
      
      setVisibilityData(data);
    } catch (error) {
      console.error("Error fetching visibility data:", error);
      setError("Failed to analyze AI visibility. Please check your API keys and try again.");
      
      // Fallback to mock data
      const mockData = generateMockData(brandData);
      setVisibilityData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brandData, provider, useMockData, queryType]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // The overall visibility score (0-100)
  const overallScore = visibilityData.overallScore;
  
  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">AI Visibility Results</h2>
          <p className="text-sm text-muted-foreground">
            See how your brand appears in AI responses
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select 
            value={queryType} 
            onValueChange={(value) => setQueryType(value as QueryType)}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select query type" />
            </SelectTrigger>
            <SelectContent>
              {QUERY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {!useMockData && (
            <div className="flex space-x-1">
              <Button 
                variant={provider === "openai" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setProvider("openai")}
              >
                OpenAI
              </Button>
              <Button 
                variant={provider === "anthropic" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setProvider("anthropic")}
              >
                Anthropic
              </Button>
              <Button 
                variant={provider === "both" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setProvider("both")}
              >
                Both
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setUseMockData(!useMockData)}
          >
            {useMockData ? "Use Real Data" : "Use Mock Data"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Query Preview Card */}
      {visibilityData.queries && (
        <Card>
          <CardHeader>
            <CardTitle>AI Search Queries</CardTitle>
            <CardDescription>
              Your keywords transformed into natural language queries that AI systems respond to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibilityData.queries.map((item: { keyword: string; query: string }, index: number) => (
                <div key={index} className="border rounded-md p-3 bg-secondary/20">
                  <div className="text-xs text-muted-foreground mb-1">Keyword:</div>
                  <div className="font-medium mb-2">{item.keyword}</div>
                  <div className="text-xs text-muted-foreground mb-1">Transformed Query:</div>
                  <div className="text-sm">{item.query}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall AI Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-secondary text-3xl font-bold">
                {overallScore}
              </div>
              <p className="mt-2 text-muted-foreground">out of 100</p>
            </div>
            <Progress 
              value={overallScore} 
              className={`h-2 mt-4 ${getScoreColor(overallScore)}`} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visibility Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Prominent Mentions:</span>
                <span className="font-medium">{visibilityData.prominentMentions}</span>
              </li>
              <li className="flex justify-between">
                <span>Vague Mentions:</span>
                <span className="font-medium">{visibilityData.vagueMentions}</span>
              </li>
              <li className="flex justify-between">
                <span>Not Found:</span>
                <span className="font-medium">{visibilityData.notFound}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Top performing keywords for your brand
            </p>
            <ul className="space-y-2">
              {visibilityData.keywordStrength.slice(0, 3).map((item: any) => (
                <li key={item.keyword} className="flex justify-between">
                  <span>{item.keyword}</span>
                  <span className="font-medium">{item.score}/10</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibilityData.keywordStrength}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="keyword" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" name="Visibility Score">
                  {visibilityData.keywordStrength.map((entry: any, index: number) => {
                    const color = entry.score >= 7 
                      ? "#22c55e" // green
                      : entry.score >= 4 
                        ? "#eab308" // yellow
                        : "#ef4444"; // red
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {!useMockData && visibilityData.results && visibilityData.results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI Response Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {visibilityData.results.slice(0, 5).map((result: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between mb-2">
                    <div>
                      <span className="font-medium">{result.keyword}</span>
                      <span className="text-xs ml-2 text-muted-foreground">via {result.provider}</span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        result.isProminent 
                          ? "bg-green-100 text-green-800" 
                          : result.hasBrandMention 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {result.isProminent 
                          ? "Prominent" 
                          : result.hasBrandMention 
                            ? "Mentioned" 
                            : "Not Found"}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Query:</strong> {result.query}
                  </div>
                  <div className="bg-secondary/50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                    <p>{result.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-[180px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[320px] w-full" />
      </CardContent>
    </Card>
  </div>
);
