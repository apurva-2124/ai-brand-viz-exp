
import { getSentimentBadge, getStatusBadge } from "./StatusBadges";
import { ActionableInsights } from "./ActionableInsights";
import { HighlightedResponse } from "./HighlightedResponse";

interface ResultItemProps {
  result: any;
  index: number;
}

export const ResultItem = ({ result, index }: ResultItemProps) => {
  const competitorsFound = result.competitorAnalysis?.competitorsFound || [];
  
  return (
    <div key={index} className="border rounded-lg p-4">
      <div className="flex flex-wrap justify-between mb-2">
        <div>
          <span className="font-medium">{result.keyword}</span>
          <span className="text-xs ml-2 text-muted-foreground">via {result.provider}</span>
          {result.queryType && (
            <span className="text-xs ml-2 px-2 py-0.5 bg-secondary rounded-full">{result.queryType}</span>
          )}
        </div>
        {getStatusBadge(result)}
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">
        <strong>Query:</strong> {result.query}
      </div>
      
      {/* Sentiment badge - only show if we have sentiment data */}
      {result.sentiment && (
        <div className="mb-2">
          {getSentimentBadge(result)}
        </div>
      )}
      
      {/* Competitor analysis - only if competitors found */}
      {competitorsFound.length > 0 && (
        <div className="text-sm mb-2 p-2 bg-red-50 rounded-md">
          <strong className="text-red-700">Competitors mentioned:</strong>
          <ul className="list-disc pl-5 mt-1">
            {competitorsFound.map((competitor: string, i: number) => (
              <li key={i} className="text-red-600 font-medium">
                Competitor Mentioned: {competitor}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Actionable insights section - in a blue box */}
      <ActionableInsights result={result} />
      
      {/* AI response with highlighted brand mentions and competitors */}
      <HighlightedResponse 
        response={result.response} 
        brandName={result.brandName || ''} 
        competitors={competitorsFound}
      />
    </div>
  );
};
