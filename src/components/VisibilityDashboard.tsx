
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BrandData } from "@/components/BrandTracker";
import { analyzeAIVisibility, AIProvider } from "@/services/aiVisibility";
import { generateMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface VisibilityDashboardProps {
  brandData: BrandData;
}

export const VisibilityDashboard = ({ brandData }: VisibilityDashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibilityData, setVisibilityData] = useState<any>(null);
  const [provider, setProvider] = useState<AIProvider>("openai");
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
        // Use real API data
        data = await analyzeAIVisibility(brandData, provider);
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
  }, [brandData, provider, useMockData]);

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">AI Visibility Results</h2>
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
        </div>
        <div className="flex items-center gap-2">
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
                  <div className="flex justify-between mb-2">
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
