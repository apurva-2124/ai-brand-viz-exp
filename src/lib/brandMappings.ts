
export interface BrandKeywordMapping {
  industry: string;
  brand: string;
  keywords: string[];
}

export const brandIndustryKeywordMappings: BrandKeywordMapping[] = [
  {
    industry: "B2B SaaS",
    brand: "Salesforce",
    keywords: ["CRM software", "Salesforce pricing", "Salesforce vs HubSpot"]
  },
  {
    industry: "B2B SaaS",
    brand: "HubSpot",
    keywords: ["inbound marketing software", "HubSpot CRM", "HubSpot alternatives"]
  },
  {
    industry: "B2B SaaS",
    brand: "Airtable",
    keywords: ["best project management tools", "Airtable templates", "Airtable vs Notion"]
  },
  {
    industry: "B2B SaaS",
    brand: "Coda",
    keywords: ["Coda app", "Coda vs Notion", "Coda templates"]
  },
  {
    industry: "B2B SaaS",
    brand: "Monday.com",
    keywords: ["project management software", "Monday.com pricing", "Monday.com vs Asana"]
  },
  {
    industry: "B2B SaaS",
    brand: "Highspot",
    keywords: ["sales enablement platform", "Highspot competitors", "Highspot features"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "Zocdoc",
    keywords: ["find a doctor", "Zocdoc reviews", "Zocdoc app"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "GoodRx",
    keywords: ["prescription drug prices", "GoodRx coupon", "GoodRx vs SingleCare"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "Hims & Hers Health",
    keywords: ["telehealth services", "Hims reviews", "Hims vs Roman"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "One Medical",
    keywords: ["primary care near me", "One Medical membership", "One Medical reviews"]
  },
  {
    industry: "Healthcare & Wellness",
    brand: "Roman (Ro Health)",
    keywords: ["men's health online", "Roman ED treatment", "Roman vs Hims"]
  },
  {
    industry: "Fashion & Apparel",
    brand: "Shein",
    keywords: ["affordable women's clothing", "Shein dresses", "Shein reviews"]
  },
  {
    industry: "eCommerce & Retail",
    brand: "Wayfair",
    keywords: ["online furniture store", "Wayfair couches", "Wayfair customer service"]
  },
  {
    industry: "Fashion & Apparel",
    brand: "Warby Parker",
    keywords: ["buy eyeglasses online", "Warby Parker frames", "Warby Parker vs Zenni"]
  },
  {
    industry: "Fashion & Apparel",
    brand: "Glossier",
    keywords: ["Glossier skincare", "Glossier makeup", "Glossier reviews"]
  },
  {
    industry: "Fashion & Apparel",
    brand: "Vuori",
    keywords: ["Vuori clothing", "Vuori joggers", "Vuori vs Lululemon"]
  },
  {
    industry: "Direct-to-Consumer & Lifestyle",
    brand: "Beis Travel",
    keywords: ["Beis luggage", "Beis weekender bag", "Beis vs Away"]
  },
  {
    industry: "Consumer Packaged Goods",
    brand: "Magic Spoon",
    keywords: ["healthy cereal", "Magic Spoon flavors", "Magic Spoon reviews"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Vrbo",
    keywords: ["vacation rentals", "Vrbo vs Airbnb", "Vrbo reviews"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Marriott Bonvoy",
    keywords: ["Marriott rewards program", "Marriott Bonvoy credit card", "Marriott Bonvoy login"]
  },
  {
    industry: "Automotive & Mobility",
    brand: "Turo",
    keywords: ["car rental alternatives", "Turo reviews", "Turo vs Enterprise"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Scott's Cheap Flights",
    keywords: ["flight deals newsletter", "Scott's Cheap Flights reviews", "Scott's Cheap Flights vs Kayak"]
  },
  {
    industry: "Travel & Hospitality",
    brand: "Selina Hotels",
    keywords: ["Selina hostel", "Selina CoLive", "Selina reviews"]
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
