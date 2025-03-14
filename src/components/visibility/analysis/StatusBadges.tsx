
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

// New function to get Google ranking badge based on rank position
export const getGoogleRankingBadge = (rank?: number) => {
  if (!rank) {
    return (
      <Badge className="bg-red-100 text-red-800">
        Not Found in Google
      </Badge>
    );
  } else if (rank === 1) {
    return (
      <Badge className="bg-green-100 text-green-800">
        Top Google Result
      </Badge>
    );
  } else if (rank <= 10) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        High Google Ranking
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-orange-100 text-orange-800">
        Low Google Visibility
      </Badge>
    );
  }
};

// New function to get mentions badge for comparison table
export const getMentionsBadge = (count: number, isAI: boolean, status?: string) => {
  if (isAI) {
    if (!count) {
      return (
        <Badge className="bg-red-100 text-red-800">
          Not Found (0x)
        </Badge>
      );
    } else if (status === 'explicitly_recommended') {
      return (
        <Badge className="bg-green-100 text-green-800">
          Mentioned ({count}x)
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          Mentioned ({count}x)
        </Badge>
      );
    }
  } else {
    // Google mentions
    if (!count) {
      return (
        <Badge className="bg-red-100 text-red-800">
          Not Found (0x)
        </Badge>
      );
    } else if (status === 'top') {
      return (
        <Badge className="bg-green-100 text-green-800">
          Top Google Result ({count}x)
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          Mentioned ({count}x)
        </Badge>
      );
    }
  }
};

// New function to get recommendation badge for comparison table
export const getRecommendationBadge = (isRecommended: boolean, isAI: boolean) => {
  if (isAI) {
    if (isRecommended) {
      return (
        <Badge className="bg-green-100 text-green-800">
          Recommended
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          Not Recommended
        </Badge>
      );
    }
  } else {
    // Google recommendation
    if (isRecommended) {
      return (
        <Badge className="bg-green-100 text-green-800">
          Recommended
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800">
          Not Highlighted
        </Badge>
      );
    }
  }
};
