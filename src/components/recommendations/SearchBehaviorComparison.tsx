
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transformKeywordToQuery } from "@/utils/queryTransformer";
import type { QueryType } from "@/utils/queryTransformer";

interface SearchBehaviorComparisonProps {
  keyword: string;
  brandName: string;
  competitors: string[];
  queryType?: QueryType;
}

export const SearchBehaviorComparison = ({ 
  keyword, 
  brandName, 
  competitors,
  queryType = "best-in-class"
}: SearchBehaviorComparisonProps) => {
  const [selectedQueryType, setSelectedQueryType] = useState<QueryType>(queryType);
  
  // Generate example queries for different search behaviors
  const traditionalQuery = transformKeywordToQuery(
    keyword, 
    selectedQueryType, 
    { 
      brand_name: brandName, 
      competitor_names: competitors.slice(0, 2).join(" and "),
      searchType: "traditional" 
    }
  );
  
  const voiceQuery = transformKeywordToQuery(
    keyword, 
    selectedQueryType, 
    { 
      brand_name: brandName, 
      competitor_names: competitors.slice(0, 2).join(" and "),
      searchType: "voice" 
    }
  );
  
  const aiChatQuery = transformKeywordToQuery(
    keyword, 
    selectedQueryType, 
    { 
      brand_name: brandName, 
      competitor_names: competitors.slice(0, 2).join(" and "),
      searchType: "ai" 
    }
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Behavior Comparison</CardTitle>
        <CardDescription>
          See how your keyword transforms across different search contexts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium">Keyword:</span>
            <span className="bg-primary/10 px-2 py-1 rounded text-sm">{keyword}</span>
          </div>
          
          <Tabs defaultValue="traditional">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="traditional">Traditional Search</TabsTrigger>
              <TabsTrigger value="voice">Voice Search</TabsTrigger>
              <TabsTrigger value="ai">AI Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="traditional" className="space-y-2">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Users might search:</p>
                <p className="text-md mt-1">{traditionalQuery}</p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Traditional search is typically keyword-focused with minimal natural language.
              </p>
            </TabsContent>
            
            <TabsContent value="voice" className="space-y-2">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Users might ask:</p>
                <p className="text-md mt-1">"{voiceQuery}"</p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Voice search is more conversational and typically uses complete sentences or questions.
              </p>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-2">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Users might prompt an AI assistant:</p>
                <p className="text-md mt-1">"{aiChatQuery}"</p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                AI chat interactions are detailed, contextual, and often include specific requirements or constraints.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
