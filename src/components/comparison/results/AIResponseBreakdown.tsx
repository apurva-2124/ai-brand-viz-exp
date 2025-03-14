
interface AIResponseBreakdownProps {
  competitorMentions: string[];
  sentiment: any;
  recommendation: any;
}

export const AIResponseBreakdown = ({
  competitorMentions,
  sentiment,
  recommendation
}: AIResponseBreakdownProps) => {
  return (
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
  );
};
