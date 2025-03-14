
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeSentiment, detectRecommendation, generateComparisonInsights } from "@/utils/sentimentAnalysis";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getStatusBadge, getGoogleRankingBadge, getMentionsBadge, getRecommendationBadge } from "@/components/visibility/analysis/StatusBadges";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName?: string;
}

export const ComparisonResults = ({ aiResult, comparisonData, brandName = "" }: ComparisonResultsProps) => {
  const [isAIResultsOpen, setIsAIResultsOpen] = useState(false);
  const [isTraditionalResultsOpen, setIsTraditionalResultsOpen] = useState(false);
  
  if (!aiResult || !comparisonData) return null;
  
  // Calculate visibility level with improved logic
  const hasBrandMention = aiResult.hasBrandMention || (aiResult.visibilityScore?.level !== "not_found");
  
  // Improved logic for determining prominence
  const isProminent = aiResult.isProminent || 
    (hasBrandMention && aiResult.response && 
      aiResult.response.toLowerCase().indexOf(brandName.toLowerCase()) < aiResult.response.length / 3);
  
  // Get competitor mentions
  const competitorMentions = aiResult.competitorAnalysis?.competitorsFound || [];
  
  // Improved brand mention count in AI response
  let brandMentionCount = 0;
  if (aiResult.response && brandName) {
    const regex = new RegExp(brandName, 'gi');
    const matches = aiResult.response.match(regex);
    brandMentionCount = matches ? matches.length : 0;
  }

  // Improved Google search mention count
  let googleMentionCount = 0;
  if (comparisonData.topResults && comparisonData.topResults.length > 0) {
    comparisonData.topResults.forEach(result => {
      if (result.hasBrandMention) {
        googleMentionCount++;
      } else if (
        (result.title && result.title.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.description && result.description.toLowerCase().includes(brandName.toLowerCase())) ||
        (result.url && result.url.toLowerCase().includes(brandName.toLowerCase()))
      ) {
        googleMentionCount++;
      }
    });
  }

  // New: Analyze sentiment and recommendation status
  const sentiment = analyzeSentiment(aiResult.response, brandName);
  const recommendation = detectRecommendation(aiResult.response, brandName);
  
  // Generate comparison insights
  const comparisonInsights = generateComparisonInsights(
    {...aiResult, brandMentionCount, sentiment, recommendation},
    {...comparisonData, brandMentions: googleMentionCount},
    brandName
  );

  // Get Google rank
  const googleRank = comparisonData.topResults[0]?.rank;
  const isTopGoogleResult = googleRank === 1;
  
  // Determine if the brand is explicitly recommended in AI
  const isExplicitlyRecommended = recommendation.level === 'explicitly_recommended';
  
  // Grammar correction for mention count
  const mentionText = brandMentionCount === 1 ? "time" : "times";

  // Generate actionable hypotheses
  const getActionableHypotheses = () => {
    const hypotheses = [];
    
    if (!isProminent && hasBrandMention) {
      hypotheses.push("Does AI prefer brands with more structured, AI-optimized content?");
    }
    
    if (recommendation.level !== 'explicitly_recommended' && hasBrandMention) {
      hypotheses.push("Can increasing external citations improve AI recommendations?");
    }
    
    if (googleMentionCount > 0 && !hasBrandMention) {
      hypotheses.push("Why does the brand appear in traditional search but not in AI responses?");
    }
    
    if (competitorMentions.length > 0) {
      hypotheses.push(`Are competitors (${competitorMentions.join(', ')}) doing something different for AI visibility?`);
    }
    
    hypotheses.push("Would AI-specific content (FAQ, schema markup) improve ranking?");
    
    return hypotheses;
  };

  return (
    <div className="space-y-4">
      {/* 1️⃣ AI Search Overview for [query_keyword] - With improved spacing */}
      <div className="p-5 border rounded bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-lg">AI Search Overview for "{aiResult.keyword || comparisonData.query}"</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">Brand:</span> 
            <span>{brandName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-blue-600">Google Rank:</span> 
            <span className="text-blue-600">#{comparisonData.topResults[0]?.rank || 'Not Found'}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium">AI Mentions:</span> 
              <span className="font-bold">{brandMentionCount} {mentionText}</span>
            </div>
            <div className="mt-1">
              {getStatusBadge({
                hasBrandMention, 
                recommendationStatus: recommendation
              })}
            </div>
          </div>
          {sentiment.sentiment !== 'neutral' && (
            <div><span className="font-medium">AI Sentiment:</span> {sentiment.explanation}</div>
          )}
        </div>
        
        {/* Show transformed query info without general tag */}
        <div className="mb-4 p-3 bg-secondary/20 rounded-md">
          <div className="text-xs text-muted-foreground mb-1">Transformed Query:</div>
          <div className="text-sm">{aiResult.query || comparisonData.query}</div>
        </div>
        
        {/* 2️⃣ Key AI Search Insights - with bold text instead of emoji */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 underline">Key AI Search Insights</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              AI {recommendation.level === 'explicitly_recommended' ? 'recommends' : 
                 hasBrandMention ? 'mentions but does not explicitly recommend' : 'does not mention'} {brandName}.
            </li>
            <li>
              Google {googleMentionCount > 0 ? 
                (comparisonData.topResults[0]?.hasBrandMention ? 'ranks it as a top result' : 'includes it in results') : 
                'does not include it in top results'}.
            </li>
            {competitorMentions.length > 0 && (
              <li>
                AI explicitly mentions competitors: 
                <span className="text-red-600 font-medium"> {competitorMentions.join(', ')}</span>.
              </li>
            )}
          </ul>
        </div>
        
        {/* 3️⃣ AI vs. Traditional Search: Quick Comparison - with improved badges */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 underline">AI vs. Traditional Search: Quick Comparison</h4>
          <Table className="border">
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-medium">Search Type</TableHead>
                <TableHead className="font-medium">Brand Mentions</TableHead>
                <TableHead className="font-medium">Recommendation</TableHead>
                <TableHead className="font-medium">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className={!hasBrandMention ? "bg-red-50" : ""}>
                <TableCell className="font-medium">AI Search</TableCell>
                <TableCell>
                  {getMentionsBadge(brandMentionCount, true, recommendation.level)}
                </TableCell>
                <TableCell>
                  {getRecommendationBadge(isExplicitlyRecommended, true)}
                </TableCell>
                <TableCell>{sentiment.sentiment}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Google Search</TableCell>
                <TableCell>
                  {getMentionsBadge(googleMentionCount, false, isTopGoogleResult ? 'top' : 'regular')}
                </TableCell>
                <TableCell>
                  {getRecommendationBadge(isTopGoogleResult, false)}
                </TableCell>
                <TableCell>Neutral</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* 4️⃣ AI Visibility Strategy: Hypotheses to Test */}
        <div>
          <h4 className="font-medium mb-2 underline">AI Visibility Strategy: Hypotheses to Test</h4>
          <div className="border border-muted rounded-md p-3">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {getActionableHypotheses().slice(0, 3).map((hypothesis, index) => (
                <li key={index}>{hypothesis}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* 5️⃣ AI Response Breakdown */}
      <div className="p-4 border rounded bg-white">
        <h4 className="font-medium mb-3 underline">AI Response Breakdown</h4>
        
        {/* Competitor analysis - only if competitors found */}
        {competitorMentions.length > 0 && (
          <div className="text-sm mb-3 p-2 bg-red-50 rounded-md">
            <strong className="text-red-700">Competitors mentioned:</strong>
            <ul className="list-disc pl-5 mt-1">
              {competitorMentions.map((competitor, i) => (
                <li key={i} className="text-red-600 font-medium">
                  Competitor Mentioned: {competitor}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Sentiment & recommendation summary */}
        <div className="mb-3 text-sm">
          <p><strong>Sentiment:</strong> {sentiment.explanation}</p>
          <p><strong>Recommendation Status:</strong> {recommendation.explanation}</p>
        </div>
      </div>
      
      {/* 6️⃣ Full AI Search Results - collapsed by default with "View AI Response" button */}
      <Collapsible open={isAIResultsOpen} onOpenChange={setIsAIResultsOpen} className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-secondary/20">
          <h4 className="font-medium">Full AI Search Results</h4>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> View AI Response
            {isAIResultsOpen ? 
              <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            }
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">
            <AIResults aiResult={{
              ...aiResult, 
              brandMentionCount, 
              isProminent, 
              brandName,
              sentiment,
              recommendation
            }} />
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* 7️⃣ Full Traditional Search Results - collapsed by default with "View Traditional Results" button */}
      <Collapsible open={isTraditionalResultsOpen} onOpenChange={setIsTraditionalResultsOpen} className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-secondary/20">
          <h4 className="font-medium">Full Traditional Search Results</h4>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> View Traditional Results
            {isTraditionalResultsOpen ? 
              <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            }
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">
            <TraditionalResults comparisonData={{...comparisonData, brandMentions: googleMentionCount}} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
