
import { Badge } from "@/components/ui/badge";

// Get consolidated status badge
export const getStatusBadge = (result: any) => {
  const hasBrandMention = result.hasBrandMention;
  
  if (result.recommendationStatus?.level === 'explicitly_recommended') {
    return (
      <Badge className="bg-green-100 text-green-800">
        ✅ Mentioned & Recommended
      </Badge>
    );
  } else if (hasBrandMention && result.recommendationStatus?.level === 'mentioned_not_recommended') {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        ⚠ Mentioned, Not Recommended
      </Badge>
    );
  } else if (hasBrandMention) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        ⚠ Mentioned, Not Recommended
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-100 text-red-800">
        ❌ Not Mentioned in AI
      </Badge>
    );
  }
};

// Get sentiment badge - removed since it wasn't providing useful insight
export const getSentimentBadge = (result: any) => {
  if (!result.sentiment) return null;
  
  // Only return sentiment badge for non-neutral sentiment
  switch (result.sentiment.sentiment) {
    case 'positive':
      return (
        <Badge className="bg-green-100 text-green-800">
          Positive Sentiment: {result.sentiment.explanation}
        </Badge>
      );
    case 'negative':
      return (
        <Badge className="bg-red-100 text-red-800">
          Negative Sentiment: {result.sentiment.explanation}
        </Badge>
      );
    default:
      return null; // Don't display badge for neutral sentiment
  }
};
