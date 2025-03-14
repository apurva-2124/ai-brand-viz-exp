
import { Badge } from "@/components/ui/badge";

// Get consolidated status badge
export const getStatusBadge = (result: any) => {
  const hasBrandMention = result.hasBrandMention;
  const isProminent = result.isProminent;
  
  if (result.recommendationStatus?.level === 'explicitly_recommended') {
    return (
      <Badge className="bg-green-100 text-green-800">
        ✅ Strong AI Recommendation
      </Badge>
    );
  } else if (hasBrandMention && result.recommendationStatus?.level === 'mentioned_not_recommended') {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        ⚠️ Needs Optimization
      </Badge>
    );
  } else if (isProminent) {
    return (
      <Badge className="bg-green-100 text-green-800">
        ✅ Prominently Featured
      </Badge>
    );
  } else if (hasBrandMention) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        🟡 Mentioned
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-100 text-red-800">
        ❌ Not Found
      </Badge>
    );
  }
};

// Get sentiment badge
export const getSentimentBadge = (result: any) => {
  if (!result.sentiment) return null;
  
  switch (result.sentiment.sentiment) {
    case 'positive':
      return (
        <Badge className="bg-green-100 text-green-800">
          🟢 Positive
        </Badge>
      );
    case 'negative':
      return (
        <Badge className="bg-red-100 text-red-800">
          🔴 Negative
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800">
          🔹 Neutral
        </Badge>
      );
  }
};
