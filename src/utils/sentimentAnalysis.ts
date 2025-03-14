
/**
 * Utility functions for analyzing sentiment and recommendations in AI responses
 */

type SentimentScore = {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  explanation: string;
};

type RecommendationLevel = 'explicitly_recommended' | 'mentioned_not_recommended' | 'not_mentioned';

/**
 * Analyzes the sentiment of AI-generated content about a specific brand
 */
export function analyzeSentiment(text: string, brandName: string): SentimentScore {
  if (!text || !brandName || typeof text !== 'string') {
    return {
      sentiment: 'neutral',
      score: 0,
      explanation: 'No content to analyze'
    };
  }

  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  
  // Check if brand is mentioned at all
  if (!lowerText.includes(lowerBrand)) {
    return {
      sentiment: 'neutral',
      score: 0,
      explanation: 'Brand not mentioned'
    };
  }
  
  // Define positive and negative keyword patterns
  const positivePatterns = [
    `${lowerBrand} is (great|excellent|leading|top|best|recommended|popular|innovative)`,
    `recommend.{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,30}(leader|market leader|industry leader)`,
    `best.{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,30}(excellent|outstanding|exceptional)`,
    `${lowerBrand}.{0,20}(popular choice|widely used)`,
    `${lowerBrand}.{0,40}(positive|excellent).{0,30}(reviews|ratings)`,
    `benefits.{0,30}${lowerBrand}`,
    `${lowerBrand}.{0,30}advantage`
  ];
  
  const negativePatterns = [
    `${lowerBrand}.{0,30}(expensive|costly|pricey)`,
    `${lowerBrand}.{0,30}(difficult|complex|complicated)`,
    `(issues|problems|challenges).{0,30}${lowerBrand}`,
    `${lowerBrand}.{0,30}(drawback|downside|limitation)`,
    `${lowerBrand}.{0,40}(poor|negative).{0,30}(reviews|ratings)`,
    `alternative.{0,20}to.{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,30}(lacks|missing|doesn't have)`,
    `better than.{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,30}(declining|struggling)`
  ];
  
  // Count sentiment matches
  let positiveCount = 0;
  let positiveMatches: string[] = [];
  
  for (const pattern of positivePatterns) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerText)) {
      positiveCount++;
      const match = lowerText.match(regex);
      if (match) positiveMatches.push(match[0]);
    }
  }
  
  let negativeCount = 0;
  let negativeMatches: string[] = [];
  
  for (const pattern of negativePatterns) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerText)) {
      negativeCount++;
      const match = lowerText.match(regex);
      if (match) negativeMatches.push(match[0]);
    }
  }
  
  // Calculate sentiment
  if (positiveCount > negativeCount && positiveCount > 0) {
    return {
      sentiment: 'positive',
      score: positiveCount - negativeCount,
      explanation: `Positive tone with phrases like: ${positiveMatches.slice(0, 2).join(', ')}`
    };
  } else if (negativeCount > positiveCount && negativeCount > 0) {
    return {
      sentiment: 'negative',
      score: negativeCount - positiveCount,
      explanation: `Negative tone with phrases like: ${negativeMatches.slice(0, 2).join(', ')}`
    };
  } else {
    return {
      sentiment: 'neutral',
      score: 0,
      explanation: positiveCount > 0 ? 
        'Mixed or balanced sentiment' : 
        'Factual/descriptive content without strong sentiment'
    };
  }
}

/**
 * Detects whether a brand is explicitly recommended in the text
 */
export function detectRecommendation(text: string, brandName: string): {
  level: RecommendationLevel;
  explanation: string;
} {
  if (!text || !brandName || typeof text !== 'string') {
    return {
      level: 'not_mentioned',
      explanation: 'No content to analyze'
    };
  }

  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  
  // Check if brand is mentioned at all
  if (!lowerText.includes(lowerBrand)) {
    return {
      level: 'not_mentioned',
      explanation: 'Brand not mentioned in the content'
    };
  }
  
  // Define recommendation patterns
  const recommendationPatterns = [
    `recommend.{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,20}is (recommended|a great choice|the best option)`,
    `(choose|select|go with|opt for).{0,20}${lowerBrand}`,
    `${lowerBrand}.{0,20}is (ideal|perfect|excellent) for`,
    `${lowerBrand}.{0,20}stands out`,
    `${lowerBrand}.{0,20}leads the (market|industry|pack)`,
    `${lowerBrand}.{0,20}offers the best`
  ];
  
  // Check for explicit recommendations
  for (const pattern of recommendationPatterns) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerText)) {
      return {
        level: 'explicitly_recommended',
        explanation: 'Brand is explicitly recommended'
      };
    }
  }
  
  // Brand is mentioned but not explicitly recommended
  return {
    level: 'mentioned_not_recommended',
    explanation: 'Brand is mentioned but not explicitly recommended'
  };
}

/**
 * Generates a comparison summary between AI and traditional search results
 */
export function generateComparisonInsights(
  aiResult: any, 
  traditionalData: any, 
  brandName: string
): string {
  if (!aiResult || !traditionalData || !brandName) {
    return "Insufficient data for comparison";
  }
  
  // Get AI visibility data
  const aiMentions = aiResult.brandMentionCount || 0;
  const aiSentiment = analyzeSentiment(aiResult.response, brandName);
  const aiRecommendation = detectRecommendation(aiResult.response, brandName);
  
  // Get traditional search data
  const traditionalMentions = traditionalData.brandMentions || 0;
  const traditionalTopRank = traditionalData.topResults?.some(
    (result: any) => result.rank === 1 && 
    (result.hasBrandMention || (result.url && result.url.toLowerCase().includes(brandName.toLowerCase())))
  );
  
  // Generate insights based on comparison
  const insights = [];
  
  // Compare visibility
  if (traditionalTopRank && aiMentions === 0) {
    insights.push(`${brandName} ranks at the top in Google search but is absent from AI-generated responses.`);
  } else if (traditionalTopRank && aiMentions > 0 && aiRecommendation.level !== 'explicitly_recommended') {
    insights.push(`${brandName} appears as a top result in Google search but is only mentioned without recommendation in AI responses.`);
  } else if (!traditionalTopRank && aiRecommendation.level === 'explicitly_recommended') {
    insights.push(`AI search explicitly recommends ${brandName}, while it doesn't appear as a top result in Google search.`);
  } else if (traditionalMentions > aiMentions) {
    insights.push(`${brandName} appears more frequently in Google search results (${traditionalMentions} times) than in AI responses (${aiMentions} times).`);
  } else if (aiMentions > traditionalMentions) {
    insights.push(`${brandName} is mentioned more in AI responses (${aiMentions} times) than in top Google search results (${traditionalMentions} times).`);
  }
  
  // Add sentiment analysis
  if (aiMentions > 0) {
    insights.push(`AI search has a ${aiSentiment.sentiment} tone towards ${brandName}. ${aiSentiment.explanation}`);
  }
  
  // Add recommendation status
  if (aiRecommendation.level === 'explicitly_recommended') {
    insights.push(`The AI explicitly recommends ${brandName}.`);
  } else if (aiRecommendation.level === 'mentioned_not_recommended') {
    insights.push(`${brandName} is mentioned ${aiMentions} time${aiMentions !== 1 ? 's' : ''} but not explicitly recommended by the AI.`);
  }
  
  return insights.join(' ');
}
