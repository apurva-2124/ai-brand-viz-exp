
export interface BrandKeywordMapping {
  industry: string;
  brand: string;
  keywords: string[];
}

export const brandIndustryKeywordMappings: BrandKeywordMapping[] = [
  {
    industry: "Travel & Hospitality",
    brand: "Airbnb",
    keywords: ["Short-term rentals", "Vacation homes", "Airbnb rentals"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Expedia",
    keywords: ["Discount travel", "Cheap flights", "All-inclusive resorts"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Booking.com",
    keywords: ["Hotel reservations", "Last-minute hotels", "Luxury hotels"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "TripAdvisor",
    keywords: ["Travel reviews", "Best vacation spots", "Top-rated destinations"]
  },
  {
    industry: "Consumer Goods & CPG",
    brand: "Casper",
    keywords: ["Best mattresses", "Memory foam mattress", "Orthopedic mattress"]
  },
  {
    industry: "Consumer Goods & CPG",
    brand: "Purple",
    keywords: ["Pressure relief mattress", "Back pain mattress", "Cooling mattress"]
  },
  {
    industry: "Consumer Goods & CPG",
    brand: "Sephora",
    keywords: ["Beauty products", "Skincare essentials", "Makeup brands"]
  },
  {
    industry: "Fitness & Consumer Brands",
    brand: "Peloton",
    keywords: ["Home workout", "Exercise bike", "Peloton bike"]
  },
  {
    industry: "Fitness & Consumer Brands",
    brand: "Birkenstock",
    keywords: ["Comfortable sandals", "Arch support shoes", "Foot pain relief shoes"]
  },
  {
    industry: "Automotive & Mobility",
    brand: "Rivian",
    keywords: ["Electric truck", "EV truck", "Sustainable vehicle"]
  },
  {
    industry: "Entertainment & Media",
    brand: "GeekWire",
    keywords: ["Tech news", "Startup funding", "Tech startup news"]
  },
  {
    industry: "Entertainment & Media",
    brand: "TechCrunch",
    keywords: ["Venture capital", "Investment news", "Silicon Valley insights"]
  },
  {
    industry: "Entertainment & Media",
    brand: "Engadget",
    keywords: ["Consumer tech reviews", "Gadget reviews", "Best smartphones"]
  },
  {
    industry: "Luxury & Designer Brands",
    brand: "Louis Vuitton",
    keywords: ["Luxury handbags", "Designer bags", "Fashion accessories"]
  },
  {
    industry: "Luxury & Designer Brands",
    brand: "Rolex",
    keywords: ["Luxury watches", "High-end timepieces", "Prestige watches"]
  },
  {
    industry: "Luxury & Designer Brands",
    brand: "Patagonia",
    keywords: ["Sustainable outdoor gear", "Eco-friendly clothing", "Outdoor adventure gear"]
  },
  {
    industry: "Education & E-Learning",
    brand: "MasterClass",
    keywords: ["Online learning", "Video courses", "Self-improvement classes"]
  },
  {
    industry: "Education & E-Learning",
    brand: "Duolingo",
    keywords: ["Learn a language", "Language app", "Bilingual education"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "Calm",
    keywords: ["Meditation app", "Sleep aid", "Mindfulness exercises"]
  },
  {
    industry: "Retail & Fashion",
    brand: "Nike",
    keywords: ["Running shoes", "Athletic clothing", "Sports gear"]
  }
];

// Function to get unique industries from the mappings
export const getUniqueIndustries = (): string[] => {
  return [...new Set(brandIndustryKeywordMappings.map(item => item.industry))];
};

// Function to get brands by industry
export const getBrandsByIndustry = (industry: string): string[] => {
  return brandIndustryKeywordMappings
    .filter(item => item.industry === industry)
    .map(item => item.brand);
};

// Function to get keywords by brand
export const getKeywordsByBrand = (brand: string): string[] => {
  const mapping = brandIndustryKeywordMappings.find(item => item.brand === brand);
  return mapping ? mapping.keywords : [];
};

// Function to get industry by brand
export const getIndustryByBrand = (brand: string): string | undefined => {
  const mapping = brandIndustryKeywordMappings.find(item => item.brand === brand);
  return mapping?.industry;
};

// Function to get brand mapping by brand name
export const getBrandMapping = (brand: string): BrandKeywordMapping | undefined => {
  return brandIndustryKeywordMappings.find(item => item.brand === brand);
};

// Default first brand to use
export const getDefaultBrand = (): BrandKeywordMapping => {
  return brandIndustryKeywordMappings[0];
};
