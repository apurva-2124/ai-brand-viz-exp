
import { BrandData } from "@/components/BrandTracker";

// Generate visibility data for the dashboard
export const generateMockData = (brandData: BrandData) => {
  // Create an overall score between 0-100
  const overallScore = Math.floor(Math.random() * 60) + 20;
  
  // Generate counts for different mention types
  const totalMentions = brandData.keywords.length;
  const prominentMentions = Math.floor(totalMentions * (Math.random() * 0.4 + 0.1));
  const vagueMentions = Math.floor(totalMentions * (Math.random() * 0.3 + 0.2));
  const notFound = totalMentions - prominentMentions - vagueMentions;
  
  // Generate keyword strength data
  const keywordStrength = brandData.keywords.map(keyword => {
    // Score between 1-10
    const score = Math.floor(Math.random() * 9) + 1;
    return {
      keyword,
      score
    };
  });
  
  return {
    overallScore,
    prominentMentions,
    vagueMentions,
    notFound,
    keywordStrength,
  };
};

// Generate competitor data
export const generateMockCompetitorData = (brandData: BrandData) => {
  // Generate random competitor names based on industry
  let competitorNames: string[] = [];
  
  switch (brandData.industry) {
    case "Technology":
      competitorNames = ["TechGiant", "InnovateCorp", "DigiSolutions", "ByteWave", "CloudNexus"];
      break;
    case "Retail & E-Commerce":
      competitorNames = ["ShopEasy", "RetailPrime", "MegaStore", "QuickBuy", "ShopNow"];
      break;
    case "Healthcare & Pharma":
      competitorNames = ["HealthPlus", "MediCare", "WellnessGroup", "VitalCare", "LifeHealth"];
      break;
    case "Finance & Insurance":
      competitorNames = ["MoneyWise", "CapitalGroup", "InvestSmart", "WealthManage", "FinanceFirst"];
      break;
    case "Education & E-Learning":
      competitorNames = ["EduLearn", "SchoolConnect", "KnowledgeHub", "SkillsAcademy", "LearningPath"];
      break;
    case "Entertainment & Media":
      competitorNames = ["MediaMax", "EntertainNow", "StreamCentral", "ContentKing", "ViewersChoice"];
      break;
    case "Food & Beverage":
      competitorNames = ["FoodDelight", "TastyBites", "FlavorFusion", "CulinaryMasters", "GourmetCorner"];
      break;
    case "Travel & Hospitality":
      competitorNames = ["TravelEase", "JourneyMasters", "StayComfort", "ExploreMore", "VacationPro"];
      break;
    case "Automotive & Mobility":
      competitorNames = ["DriveInnovate", "AutoTech", "MobilityPlus", "RideRevolution", "SpeedSolutions"];
      break;
    case "B2B & Enterprise Services":
      competitorNames = ["EnterpriseHub", "B2BSolutions", "BusinessConnect", "CorpServices", "ProPartners"];
      break;
    case "Consumer Goods & CPG":
      competitorNames = ["ConsumerChoice", "ProductPrime", "GoodsGalore", "EssentialsPlus", "PremiumProducts"];
      break;
    case "Energy & Sustainability":
      competitorNames = ["GreenEnergy", "SustainPower", "EcoSolutions", "RenewableInc", "CleanTech"];
      break;
    case "Real Estate & PropTech":
      competitorNames = ["PropertyPro", "RealtyTech", "HomeHub", "EstateInnovate", "SpaceConnect"];
      break;
    case "Legal & Compliance":
      competitorNames = ["LegalEase", "CompliancePro", "LawPartners", "RegulatoryEdge", "LegalTech"];
      break;
    default:
      competitorNames = ["Competitor A", "Competitor B", "Competitor C", "Competitor D", "Competitor E"];
  }
  
  // Generate random scores for competitors
  const competitors = competitorNames.slice(0, 4).map(name => ({
    name,
    score: Math.floor(Math.random() * 60) + 20
  })).sort((a, b) => b.score - a.score);
  
  // Generate competitive keywords (where competitors score higher)
  const competitiveKeywords = brandData.keywords.slice(0, 3).map(keyword => ({
    keyword,
    yourScore: Math.floor(Math.random() * 4) + 1,
    competitorScore: Math.floor(Math.random() * 4) + 6
  }));
  
  // Generate opportunity keywords (where you score higher)
  const opportunityKeywords = brandData.keywords.slice(3).map(keyword => ({
    keyword,
    yourScore: Math.floor(Math.random() * 4) + 6,
    competitorScore: Math.floor(Math.random() * 4) + 1
  }));
  
  return {
    competitors,
    competitiveKeywords,
    opportunityKeywords
  };
};

// Generate recommendations
export const generateMockRecommendations = (brandData: BrandData) => {
  // Generic visibility tips
  const visibilityTips = [
    "Create structured content that directly answers common questions about your brand and products.",
    "Ensure your website includes comprehensive information that AI models can index and reference.",
    "Use consistent brand terminology across all your digital content.",
    "Build more authoritative backlinks to strengthen your brand's online presence.",
    "Create expert content that positions your brand as an authority in your industry."
  ];
  
  // Generate keyword recommendations
  const keywordRecommendations = brandData.keywords.slice(0, 4).map(keyword => {
    const reasons = [
      `Low visibility for "${keyword}" in AI responses. Focus on creating authoritative content.`,
      `Competitors are outranking you for "${keyword}". Create more specific content.`,
      `"${keyword}" has high search volume but your brand isn't being mentioned.`,
      `AI responses for "${keyword}" reference outdated information about your brand.`
    ];
    
    return {
      keyword,
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    };
  });
  
  // Generate content strategy recommendations
  const contentStrategy = [
    {
      title: "Structured Data Implementation",
      description: "Add structured data markup to your website to help AI better understand your content.",
      example: `Add Schema.org markup for your ${brandData.name} products to increase visibility in AI responses.`
    },
    {
      title: "Authoritative Content Creation",
      description: "Create in-depth, factual content about your brand, products, and industry expertise.",
      example: `Publish a detailed guide on "${brandData.keywords[0]}" that positions ${brandData.name} as an authority.`
    },
    {
      title: "Consistent Brand Terminology",
      description: "Use consistent naming and terminology across all digital platforms.",
      example: `Always refer to your products using consistent naming conventions so AI models associate them with ${brandData.name}.`
    }
  ];
  
  return {
    visibilityTips,
    keywordRecommendations,
    contentStrategy
  };
};
