import { BrandData } from "@/components/BrandTracker";
import { generateQueriesForKeywords } from "@/utils/queryTransformer";

// Generate mock AI visibility data for testing
export function generateMockData(brandData: BrandData) {
  const queries = generateQueriesForKeywords(
    brandData.keywords,
    brandData.name,
    brandData.industry,
    brandData.competitors
  );
  
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
      provider: "OpenAI",
      visibilityScore: {
        level: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "low" : "not_found",
        label: Math.random() > 0.7 ? "Prominent" : Math.random() > 0.4 ? "Present" : "Not Found",
        score: Math.floor(Math.random() * 10),
        context: null
      },
      competitorAnalysis: {
        competitorsFound: Math.random() > 0.5 ? 
          brandData.competitors?.slice(0, Math.floor(Math.random() * (brandData.competitors?.length || 0) + 1)) || [] : 
          [],
        competitorOutranking: Math.random() > 0.6,
        riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low"
      },
      recommendation: "Optimize content to increase brand visibility"
    });
    
    // Create an Anthropic mock result
    results.push({
      keyword,
      query,
      response: generateMockResponse(keyword, brandData.name, brandData.industry),
      hasBrandMention: Math.random() > 0.3, // 70% chance of brand mention
      isProminent: Math.random() > 0.5, // 50% chance of prominent mention
      provider: "Anthropic",
      visibilityScore: {
        level: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "low" : "not_found",
        label: Math.random() > 0.7 ? "Prominent" : Math.random() > 0.4 ? "Present" : "Not Found",
        score: Math.floor(Math.random() * 10),
        context: null
      },
      competitorAnalysis: {
        competitorsFound: Math.random() > 0.5 ? 
          brandData.competitors?.slice(0, Math.floor(Math.random() * (brandData.competitors?.length || 0) + 1)) || [] : 
          [],
        competitorOutranking: Math.random() > 0.6,
        riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low"
      },
      recommendation: "Create more detailed content about your brand features"
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
  
  // Generate mock competitor data
  const competitorsDetected: Record<string, number> = {};
  if (brandData.competitors) {
    brandData.competitors.forEach(comp => {
      competitorsDetected[comp] = Math.floor(Math.random() * results.length / 2);
    });
  }
  
  // Determine risk level
  const riskLevel = Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low";
  
  return {
    results,
    overallScore,
    prominentMentions,
    vagueMentions,
    notFound,
    keywordStrength,
    queries,
    riskLevel,
    competitorsDetected
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

// Generate mock competitor data for the Competitor Analysis component
export function generateMockCompetitorData(brandData: BrandData) {
  // Use provided competitors if available, otherwise generate mock competitors
  const competitors = brandData.competitors && brandData.competitors.length > 0 
    ? brandData.competitors.map(name => ({
        name,
        score: Math.floor(Math.random() * 50) + 50 // Random score between 50-100
      }))
    : generateMockCompetitors(brandData.industry, 4);
  
  // Sort competitors by score in descending order
  competitors.sort((a, b) => b.score - a.score);
  
  // Generate competitive keywords (where competitors score higher)
  const competitiveKeywords = brandData.keywords
    .slice(0, Math.min(3, brandData.keywords.length))
    .map(keyword => ({
      keyword,
      yourScore: Math.floor(Math.random() * 40) + 30, // Score between 30-70
      competitorScore: Math.floor(Math.random() * 30) + 70 // Score between 70-100
    }));
  
  // Generate opportunity keywords (where your brand scores higher)
  const opportunityKeywords = brandData.keywords
    .slice(Math.min(3, brandData.keywords.length))
    .map(keyword => ({
      keyword,
      yourScore: Math.floor(Math.random() * 30) + 70, // Score between 70-100
      competitorScore: Math.floor(Math.random() * 40) + 30 // Score between 30-70
    }));
  
  return {
    competitors,
    competitiveKeywords,
    opportunityKeywords
  };
}

// Generate mock recommendations based on brand data
export function generateMockRecommendations(brandData: BrandData) {
  // Generate visibility optimization tips
  const visibilityTips = [
    `Ensure your website has structured data with clear mentions of "${brandData.name}" alongside key terms like ${brandData.keywords.slice(0, 2).join(', ')}.`,
    
    `Create comprehensive FAQ pages that answer common questions about ${brandData.industry} products/services that include your brand name.`,
    
    `Develop case studies showcasing real-world applications of ${brandData.name} in the ${brandData.industry} sector.`,
    
    `Establish industry partnerships and cross-promotions to increase brand mentions across trusted domain networks.`
  ];
  
  // Generate keyword recommendations
  const keywordRecommendations = brandData.keywords.slice(0, 3).map(keyword => {
    const reasons = [
      `High search volume with relatively low competition in AI results.`,
      `Strongly aligned with your brand positioning in "${brandData.industry}".`,
      `Shows positive sentiment in AI search results.`,
      `Opportunity to differentiate from competitors.`
    ];
    
    return {
      keyword,
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    };
  });
  
  // Generate content strategy recommendations
  const contentStrategy = [
    {
      title: "Expert Commentary Content",
      description: `Publish thought leadership content about "${brandData.keywords[0]}" that positions ${brandData.name} as an authority in ${brandData.industry}.`,
      example: `"The Future of ${brandData.keywords[0]} in ${brandData.industry}: Insights from ${brandData.name}'s Research Team"`
    },
    {
      title: "Comparison Content",
      description: `Create detailed comparison guides that objectively show how ${brandData.name} performs against alternatives for key use cases.`,
      example: `"${brandData.name} vs. Competitors: Which ${brandData.industry} Solution Is Right For Your Needs?"`
    },
    {
      title: "Problem-Solution Content",
      description: `Develop content addressing specific pain points in the ${brandData.industry} that ${brandData.name} solves.`,
      example: `"How ${brandData.name} Solves the Top 5 Challenges in ${brandData.industry} Today"`
    }
  ];
  
  return {
    visibilityTips,
    keywordRecommendations,
    contentStrategy
  };
}

// Helper function to generate mock competitors based on industry
function generateMockCompetitors(industry: string, count: number = 3) {
  const industryCompetitors: Record<string, string[]> = {
    "Technology": ["TechCorp", "InnovateTech", "NextGen Solutions", "ByteWave", "QuantumSoft"],
    "Retail & E-Commerce": ["ShopNow", "RetailGiant", "MegaCart", "BuyQuick", "TrendMart"],
    "Healthcare & Pharma": ["MediCare Plus", "HealthFirst", "VitalRx", "WellnessCorp", "CarePoint"],
    "Finance & Insurance": ["SecureBank", "WealthGuard", "CapitalOne", "InsureTrust", "FinanceHub"],
    "Education & E-Learning": ["EduLearn", "KnowledgeHub", "SmartClass", "LearningTree", "EduMasters"],
    "Entertainment & Media": ["MediaMax", "EntertainNow", "StreamHub", "ContentKing", "ViewWave"],
    "Food & Beverage": ["TastyBites", "FreshFoods", "GourmetGroup", "NutriFoods", "FlavorFest"],
    "Travel & Hospitality": ["TravelEase", "GlobalStay", "JourneyMasters", "VacationPro", "StayWell"],
    "Automotive & Mobility": ["AutoTech", "DriveInnovate", "MobilityNow", "RideNext", "AutoFuture"],
    "B2B & Enterprise Services": ["EnterpriseHub", "B2BSolutions", "CorpServe", "BusinessPro", "EnterpriseTech"],
    "Consumer Goods & CPG": ["ConsumerChoice", "GoodsDaily", "ProductPrime", "LifeGoods", "HomeEssentials"],
    "Energy & Sustainability": ["GreenEnergy", "SustainPower", "EcoSource", "CleanTech", "RenewCorp"],
    "Real Estate & PropTech": ["PropertyPro", "RealtyTech", "HomeHub", "SpaceSmart", "EstateInnovate"],
    "Legal & Compliance": ["LegalEdge", "CompliancePro", "LawPartners", "RegulatePro", "LegalTech"],
    "Other": ["MarketLeader", "IndustryPro", "TopProvider", "PrimeServices", "EliteOptions"]
  };

  // Get competitors for the specified industry or fall back to "Other"
  const availableCompetitors = industryCompetitors[industry] || industryCompetitors["Other"];
  
  // Shuffle array to get random competitors
  const shuffled = [...availableCompetitors].sort(() => 0.5 - Math.random());
  
  // Take the first few based on count
  return shuffled.slice(0, count).map(name => ({
    name,
    score: Math.floor(Math.random() * 50) + 50 // Random score between 50-100
  }));
}
