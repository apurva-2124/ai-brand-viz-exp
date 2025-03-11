
import { BrandData } from "@/components/BrandTracker";
import { generateQueriesForKeywords } from "@/utils/queryTransformer";

// Generate mock AI visibility data for testing
export function generateMockData(brandData: BrandData) {
  const queries = generateQueriesForKeywords(brandData);
  const results = [];
  
  // Generate mock results for each query
  for (const { keyword, query } of queries) {
    // Create an OpenAI mock result
    results.push({
      keyword,
      query,
      response: generateMockResponse(keyword, brandData.name, brandData.industry),
      hasBrandMention: Math.random() > 0.3, // 70% chance of brand mention
      isProminent: Math.random() > 0.5, // 50% chance of prominent mention
      provider: "OpenAI"
    });
    
    // Create an Anthropic mock result
    results.push({
      keyword,
      query,
      response: generateMockResponse(keyword, brandData.name, brandData.industry),
      hasBrandMention: Math.random() > 0.3, // 70% chance of brand mention
      isProminent: Math.random() > 0.5, // 50% chance of prominent mention
      provider: "Anthropic"
    });
  }
  
  // Calculate metrics
  const prominentMentions = results.filter(r => r.isProminent).length;
  const vagueMentions = results.filter(r => r.hasBrandMention && !r.isProminent).length;
  const notFound = results.filter(r => !r.hasBrandMention).length;
  
  // Generate a score from 0-100
  const totalPossibleScore = results.length * 10;
  const earnedScore = (prominentMentions * 10) + (vagueMentions * 5);
  const overallScore = Math.round((earnedScore / totalPossibleScore) * 100);
  
  // Calculate keyword strength (score from 1-10)
  const keywordStrength = brandData.keywords.map(keyword => ({
    keyword,
    score: Math.floor(Math.random() * 10) + 1 // Random score between 1-10
  }));
  
  return {
    results,
    overallScore,
    prominentMentions,
    vagueMentions,
    notFound,
    keywordStrength,
    queries
  };
}

// Generate a mock AI response that may or may not mention the brand
function generateMockResponse(keyword: string, brandName: string, industry: string) {
  const responses = [
    `When looking for ${keyword} in the ${industry} industry, there are several options to consider. ${brandName} is one of the leading providers, known for their innovative approach and quality service. Other competitors in this space include XYZ Corp and ABC Inc, but ${brandName} often stands out for its unique features.`,
    
    `${keyword} is an important aspect of the ${industry} sector. Many companies offer solutions in this area, including IndustryLeader and TopProvider. Some users also recommend checking out ${brandName} for their specialized approach.`,
    
    `If you're interested in ${keyword}, you should research various providers in the ${industry} market. Companies like Market Leader, Innovation Co, and TechGiant dominate this space with their comprehensive offerings.`,
    
    `The best ${keyword} solutions in ${industry} come from established brands like ${brandName}, which has been recognized for excellence in this area. Their approach to ${keyword} has revolutionized how businesses operate in this sector.`,
    
    `When discussing ${keyword} in the context of ${industry}, experts often mention several key players. While ${brandName} isn't always the first name that comes up, they do offer some interesting solutions worth considering alongside the market leaders.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
