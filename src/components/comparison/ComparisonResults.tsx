
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { TraditionalSearchResults } from "@/services/traditional-search";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeSentiment, detectRecommendation, generateComparisonInsights } from "@/utils/sentimentAnalysis";

interface ComparisonResultsProps {
  aiResult: any;
  comparisonData: TraditionalSearchResults | null;
  brandName?: string;
}

export const ComparisonResults = ({ aiResult, comparisonData, brandName = "" }: ComparisonResultsProps) => {
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

  // Get consolidated status badge
  const getConsolidatedStatusBadge = () => {
    if (isProminent && recommendation.level === 'explicitly_recommended') {
      return <Badge className="bg-green-100 text-green-800">✅ Strong AI Visibility</Badge>;
    } else if (hasBrandMention && !isProminent) {
      return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Needs Optimization</Badge>;
    } else if (!hasBrandMention) {
      return <Badge className="bg-red-100 text-red-800">❌ Not Found in AI</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Mentioned, Not Recommended</Badge>;
    }
  };

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

  // Sentiment display
  const getSentimentDisplay = (sentimentValue: string) => {
    switch(sentimentValue) {
      case 'positive': return '🟢 Positive';
      case 'negative': return '🔴 Negative';
      default: return '🔹 Neutral';
    }
  };

  // Create mapping for display values
  const aiDisplayValues = {
    mentions: hasBrandMention ? `🟡 Mentioned (${brandMentionCount}x)` : '🔴 Not Found (0x)',
    recommendation: recommendation.level === 'explicitly_recommended' ? '✅ Recommended' : '⚠️ Not Recommended',
    sentiment: getSentimentDisplay(sentiment.sentiment)
  };
  
  const googleDisplayValues = {
    mentions: googleMentionCount > 0 ? 
      (comparisonData.topResults[0]?.hasBrandMention ? `🟢 Top Result (${googleMentionCount}x)` : `🟡 Mentioned (${googleMentionCount}x)`) : 
      '🔴 Not Found (0x)',
    recommendation: googleMentionCount > 0 && comparisonData.topResults[0]?.hasBrandMention ? '✅ Recommended' : '⚠️ Not Highlighted',
    sentiment: '🔹 Neutral'
  };

  return (
    <div className="space-y-4">
      {/* Search Analysis Header */}
      <div className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">AI Search Analysis for "{aiResult.keyword || comparisonData.query}"</h3>
          {getConsolidatedStatusBadge()}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div><span className="font-medium">Brand:</span> {brandName}</div>
          <div><span className="font-medium">AI Sentiment:</span> {getSentimentDisplay(sentiment.sentiment)}</div>
          <div><span className="font-medium">Google Rank:</span> #{comparisonData.topResults[0]?.rank || 'Not Found'}</div>
          <div><span className="font-medium">AI Mentions:</span> {brandMentionCount} times</div>
        </div>
        
        {/* Key Takeaways Section */}
        <div className="mb-4">
          <h4 className="font-medium mb-2">📊 Key Takeaways</h4>
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
                AI explicitly mentions competitors: {competitorMentions.join(', ')}.
              </li>
            )}
          </ul>
        </div>
        
        {/* Side-by-Side Comparison Table */}
        <div className="mb-4">
          <h4 className="font-medium mb-2">📊 AI vs Traditional Search – Side-by-Side</h4>
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
              <TableRow>
                <TableCell className="font-medium">AI Search</TableCell>
                <TableCell>{aiDisplayValues.mentions}</TableCell>
                <TableCell>{aiDisplayValues.recommendation}</TableCell>
                <TableCell>{aiDisplayValues.sentiment}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Google Search</TableCell>
                <TableCell>{googleDisplayValues.mentions}</TableCell>
                <TableCell>{googleDisplayValues.recommendation}</TableCell>
                <TableCell>{googleDisplayValues.sentiment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Next Steps Section */}
        <div>
          <h4 className="font-medium mb-2">🔬 Next Steps: Hypotheses to Test</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {getActionableHypotheses().slice(0, 3).map((hypothesis, index) => (
              <li key={index}>{hypothesis}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Original AI & Traditional Results (Collapsed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AIResults aiResult={{
          ...aiResult, 
          brandMentionCount, 
          isProminent, 
          brandName,
          sentiment,
          recommendation
        }} />
        <TraditionalResults comparisonData={{...comparisonData, brandMentions: googleMentionCount}} />
      </div>
    </div>
  );
};
