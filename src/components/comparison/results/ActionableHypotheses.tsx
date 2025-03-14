
interface ActionableHypothesesProps {
  isProminent: boolean;
  hasBrandMention: boolean;
  recommendation: any;
  googleMentionCount: number;
  competitorMentions: string[];
}

export const ActionableHypotheses = ({
  isProminent,
  hasBrandMention,
  recommendation,
  googleMentionCount,
  competitorMentions
}: ActionableHypothesesProps) => {
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
  );
};
