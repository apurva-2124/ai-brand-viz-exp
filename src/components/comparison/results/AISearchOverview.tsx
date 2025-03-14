
import { getStatusBadge, getGoogleRankingBadge } from "@/components/visibility/analysis/StatusBadges";

interface AISearchOverviewProps {
  keyword: string;
  brandName: string;
  brandMentionCount: number;
  googleRank?: number;
  query: string;
  hasBrandMention: boolean;
  recommendation: any;
  sentiment: any;
  competitorMentions: string[];
}

export const AISearchOverview = ({
  keyword,
  brandName,
  brandMentionCount,
  googleRank,
  query,
  hasBrandMention,
  recommendation,
  sentiment,
  competitorMentions
}: AISearchOverviewProps) => {
  // Grammar correction for mention count
  const mentionText = brandMentionCount === 1 ? "time" : "times";

  return (
    <div className="p-5 border rounded bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg">AI Search Overview for "{keyword}"</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium">Brand:</span> 
          <span>{brandName}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-blue-600">Google Rank:</span> 
          <span className="text-blue-600">#{googleRank || 'Not Found'}</span>
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
        <div className="text-sm">{query}</div>
      </div>
      
      {/* Key AI Search Insights */}
      <div className="mb-4">
        <h4 className="font-medium mb-2 underline">Key AI Search Insights</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            AI {recommendation.level === 'explicitly_recommended' ? 'recommends' : 
              hasBrandMention ? 'mentions but does not explicitly recommend' : 'does not mention'} {brandName}.
          </li>
          <li>
            Google {googleRank ? 
              (googleRank === 1 ? 'ranks it as a top result' : 'includes it in results') : 
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
    </div>
  );
};
