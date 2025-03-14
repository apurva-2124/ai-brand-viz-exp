
import { TraditionalSearchResults, SearchResult } from "./types";

/**
 * Get static traditional search results for testing and demo purposes
 */
export function getStaticTraditionalResults(
  brandName: string,
  query: string
): TraditionalSearchResults {
  console.log(`Getting static data for brand: ${brandName}, query: ${query}`);
  
  // Create a standardized timestamp for consistent display
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Check for specific query and brand combinations first
  const specificResults = getSpecificQueryResults(query, brandName);
  if (specificResults.length > 0) {
    return {
      searchEngine: "Google",
      query: query,
      source: "static",
      brandMentions: specificResults.filter(r => r.hasBrandMention).length,
      retrievalDate: timestamp,
      topResults: specificResults
    };
  }

  // Fallback to generic query results
  const genericResults = getQuerySpecificResults(query, brandName);
  
  return {
    searchEngine: "Google",
    query: query,
    source: "static",
    brandMentions: genericResults.filter(r => r.hasBrandMention).length,
    retrievalDate: timestamp,
    topResults: genericResults
  };
}

/**
 * Get results for specific query + brand combinations that have custom data
 */
function getSpecificQueryResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerQuery = query.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  
  // Salesforce pricing specific results
  if (lowerBrand === "salesforce" && lowerQuery === "salesforce pricing") {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/pricing/",
        title: "Salesforce Pricing: See Pricing Plans for All Salesforce Products ...",
        description: "Explore Salesforce pricing plans and learn which products and services are right for your business. Get transparent, affordable pricing for all Salesforce product suites.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/salesforce/comments/1csgxnd/i_dont_understand_the_salesforce_pricing_why_is/",
        title: "I don't understand the Salesforce pricing. Why is it so expensive?? : r ...",
        description: "Reddit discussion about Salesforce pricing, with users sharing their opinions and experiences about the platform's cost structure and value proposition.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.salesforce.com/sales/pricing/",
        title: "Salesforce Sales Pricing | Salesforce US",
        description: "Compare Sales Cloud pricing plans and find the right CRM solution for your business. Salesforce offers flexible pricing options to meet your needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A8kXISAZ",
        title: "CPQ Different Pricing by Region | Salesforce Trailblazer Community",
        description: "Salesforce Trailblazer Community discussion about implementing different pricing models by region using Salesforce CPQ.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.salesforce.com/eu/pricing/",
        title: "Salesforce Pricing: See Pricing Plans for All Salesforce Products ...",
        description: "European pricing page for Salesforce products and services. Compare plans and features to find the right solution for your business needs.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}

/**
 * Get query-specific static results (generic fallback)
 */
function getQuerySpecificResults(query: string, brandName: string): SearchResult[] {
  // Lowercase for easier comparison
  const lowerQuery = query.toLowerCase();
  
  // CRM software query
  if (lowerQuery.includes("crm") || lowerQuery.includes("crm software")) {
    return [
      {
        rank: 1,
        url: "https://www.salesforce.com/crm/what-is-crm/",
        title: "What is CRM?",
        description: `Learn about Customer Relationship Management (CRM) software and how it can help your business grow. ${brandName === "Salesforce" ? "Discover Salesforce's industry-leading CRM solutions." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.forbes.com/advisor/business/best-crm-software/",
        title: "Best CRM Software 2025",
        description: `Expert reviews and rankings of the top CRM software platforms for businesses of all sizes. ${brandName === "Salesforce" ? "See why Salesforce consistently ranks as a top choice." : ""}`,
        hasBrandMention: brandName === "Salesforce",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://keap.com/product/what-is-crm",
        title: "What is CRM? - Keap",
        description: "Keap explains what CRM software is and how it can streamline your business operations, improve customer relationships, and drive growth.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Inbound marketing software query
  if (lowerQuery.includes("inbound marketing software")) {
    return [
      {
        rank: 1,
        url: "https://www.cobloom.com/blog/best-inbound-marketing-software-saas",
        title: "The Best B2B Inbound Marketing Software Tools",
        description: "Comprehensive guide to the best inbound marketing software tools for B2B companies.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.hubspot.com/products/marketing",
        title: "Marketing Software for Businesses of Every Size",
        description: `HubSpot's all-in-one marketing software helps you grow traffic, convert visitors, and run complete inbound marketing campaigns at scale.`,
        hasBrandMention: brandName === "HubSpot",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.hubspot.com/",
        title: "HubSpot | Software & Tools for your Business - Homepage",
        description: "HubSpot offers a full platform of marketing, sales, customer service, and CRM software — plus the methodology, resources, and support — to help businesses grow better.",
        hasBrandMention: brandName === "HubSpot",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.warmly.ai/p/blog/26-inbound-marketing-tools",
        title: "27 Inbound Marketing Tools To Drive More Warm Leads",
        description: "Discover the top 27 inbound marketing tools that can help your business generate more quality leads and improve conversion rates.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.sender.net/blog/inbound-marketing-tool/",
        title: "21 Best Inbound Marketing Tools for Diverse Needs",
        description: "Explore the 21 best inbound marketing tools that can help businesses of all sizes improve their marketing strategies and drive better results.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Best project management tools query
  if (lowerQuery.includes("best project management tools")) {
    return [
      {
        rank: 1,
        url: "https://zapier.com/blog/free-project-management-software/",
        title: "The best free project management software in 2025",
        description: "Looking for the best free project management software? We've tested dozens of apps and these are our picks for the top options currently available.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://clickup.com/blog/best-project-management-tools/",
        title: "15 Best Project Management Tools in 2025",
        description: "Discover the 15 best project management tools for teams of all sizes. Compare features, pricing, and functionality to find the right solution.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/projectmanagement/comments/1b0lfvi/what_is_the_best_free_project_management_tool/",
        title: "What is the best free project management tool, specifically ...",
        description: "Reddit discussion about the best free project management tools with recommendations from real users.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://thedigitalprojectmanager.com/tools/best-project-management-software/",
        title: "25 Best Project Management Software Picked For 2025",
        description: `Comprehensive review of the top 25 project management software options for 2025. ${brandName === "Airtable" ? "Airtable is featured for its flexible database capabilities." : ""}`,
        hasBrandMention: brandName === "Airtable",
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.wrike.com/project-management-guide/faq/what-are-project-management-tools/",
        title: "Top 21 project management tools: 2025 guide",
        description: "Explore the top 21 project management tools in this comprehensive guide for 2025, covering features, use cases, and pricing.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Coda app query
  if (lowerQuery.includes("coda app")) {
    return [
      {
        rank: 1,
        url: "https://coda.io/",
        title: "Coda: Your all-in-one collaborative workspace.",
        description: "Coda is a new doc that brings words, data, and teams together. It's a canvas that blends docs, spreadsheets, and applications into one.",
        hasBrandMention: brandName === "Coda",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://play.google.com/store/apps/details?id=io.coda.codaapp&hl=en_US",
        title: "Coda - Apps on Google Play",
        description: "Coda's mobile app brings your team's docs, data, and workflow into a single platform that you can access from anywhere.",
        hasBrandMention: brandName === "Coda",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/codaio/comments/1bftq2y/is_coda_just_a_gimmick/",
        title: "Is CODA Just a Gimmick? : r/codaio",
        description: "Reddit discussion about Coda's usefulness and whether it offers real value for teams and businesses.",
        hasBrandMention: brandName === "Coda",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://apps.apple.com/us/app/coda/id1397968110",
        title: "Coda on the App Store",
        description: "Download Coda for iOS devices from the Apple App Store. Create, share and organize your team's work all in one place.",
        hasBrandMention: brandName === "Coda",
        resultType: "organic"
      }
    ];
  }
  
  // Project management software query
  if (lowerQuery.includes("project management software")) {
    return [
      {
        rank: 1,
        url: "https://thedigitalprojectmanager.com/tools/best-project-management-software/",
        title: "25 Best Project Management Software Picked For 2025",
        description: `Comprehensive guide to the best project management software solutions available in 2025. ${brandName === "Monday.com" ? "Monday.com is highlighted as a top visual project management tool." : ""}`,
        hasBrandMention: brandName === "Monday.com",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://zapier.com/blog/free-project-management-software/",
        title: "The best free project management software in 2025",
        description: "Looking for the best free project management software? We've tested dozens of apps and these are our picks for the top options currently available.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.microsoft.com/en-us/microsoft-365/project/project-management-software",
        title: "Project Management Software",
        description: "Microsoft Project helps you plan projects, assign tasks, track progress, manage budgets, and analyze workloads.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://clickup.com/blog/free-project-management-software/",
        title: "25 Best Free Project Management Software: Tools to Try in ...",
        description: "Discover the best free project management software options available for teams of all sizes and industries.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://asana.com/",
        title: "Manage your team's work, projects, & tasks online • Asana ...",
        description: "Asana is the work management platform teams use to stay focused on the goals, projects, and daily tasks that grow business.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Sales enablement platform query
  if (lowerQuery.includes("sales enablement platform")) {
    return [
      {
        rank: 1,
        url: "https://www.highspot.com/sales-enablement/",
        title: "The Definitive Guide to Sales Enablement for 2025",
        description: "Highspot's comprehensive guide to sales enablement, covering strategies, tools, and best practices for 2025.",
        hasBrandMention: brandName === "Highspot",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.gartner.com/reviews/market/revenue-enablement-platforms",
        title: "Best Revenue Enablement Platforms Reviews 2025",
        description: "Gartner's review of the top revenue enablement platforms for 2025, with user ratings and expert insights.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.salesforce.com/sales/enablement/software/",
        title: "What Is Sales Enablement Software?",
        description: "Salesforce explains what sales enablement software is and how it can help your sales team close more deals.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Find a doctor query
  if (lowerQuery.includes("find a doctor")) {
    return [
      {
        rank: 1,
        url: "https://www.healthgrades.com/",
        title: "Healthgrades | Find a Doctor - Doctor Reviews - Online Doctor ...",
        description: "Find a doctor near you with Healthgrades. Read ratings and reviews from patients, and book an appointment online.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.bcbs.com/member-services/find-a-doctor",
        title: "Find a Doctor – Specialist or Dr Finder | bcbs.com",
        description: "Use Blue Cross Blue Shield's doctor finder to locate doctors, hospitals and specialists within your network.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.zocdoc.com/",
        title: "Zocdoc | Find a Doctor Near You | Book Doctors Online",
        description: "Find the right doctor, dentist, eye doctor, or other healthcare specialist near you. Read patient reviews and book an appointment online.",
        hasBrandMention: brandName === "Zocdoc",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.pennmedicine.org/providers",
        title: "Find A Doctor or Practice Location",
        description: "Find doctors at Penn Medicine by specialty, name, or location. Schedule appointments online or by phone.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.atlantichealth.org/find-a-doctor",
        title: "Find a Doctor",
        description: "Search for doctors at Atlantic Health System by specialty, location, or name.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Prescription drug prices query
  if (lowerQuery.includes("prescription drug prices")) {
    return [
      {
        rank: 1,
        url: "https://www.thecardiologyadvisor.com/news/trump-ends-push-to-slash-prescription-drug-costs/",
        title: "Trump Ends Push to Slash Prescription Drug Costs",
        description: "Recent news about changes in policy regarding prescription drug pricing in the United States.",
        hasBrandMention: false,
        resultType: "news"
      },
      {
        rank: 2,
        url: "https://www.goodrx.com/",
        title: "GoodRx: Prescription Prices, Coupons & Pharmacy Information",
        description: "Compare prescription drug prices and find coupons at more than 70,000 U.S. pharmacies. Save up to 80% instantly!",
        hasBrandMention: brandName === "GoodRx",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.cms.gov/newsroom/press-releases/hhs-announces-15-additional-drugs-selected-medicare-drug-price-negotiations-continued-effort-lower",
        title: "HHS Announces 15 Additional Drugs Selected for ...",
        description: "Press release from the Department of Health and Human Services about Medicare drug price negotiations.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Telehealth services query
  if (lowerQuery.includes("telehealth services")) {
    return [
      {
        rank: 1,
        url: "https://www.telehealth.com/",
        title: "The Best Telehealth Services - Telehealth.com",
        description: "Comprehensive guide to the best telehealth services available, with reviews and comparisons.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://telehealth.hhs.gov/",
        title: "Telehealth.HHS.gov: Learn how to access or provide ...",
        description: "Official U.S. government website with resources for patients and providers about telehealth services.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.cvs.com/minuteclinic/virtual-care",
        title: "MinuteClinic Virtual Care",
        description: "CVS MinuteClinic offers virtual care services for minor illnesses, injuries, and skin conditions.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.cms.gov/medicare/coverage/telehealth/list-services",
        title: "List of Telehealth Services",
        description: "Medicare's list of covered telehealth services, including codes and payment information.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.teladochealth.com/",
        title: "Teladoc Health: Telehealth & Telemedicine Provider",
        description: "Teladoc Health connects patients with licensed healthcare professionals via phone or video for on-demand care.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Primary care near me query
  if (lowerQuery.includes("primary care near me")) {
    return [
      {
        rank: 1,
        url: "https://www.nyp.org/medicalgroups/queens/primary-care",
        title: "Queens Primary Care and Family Medicine",
        description: "NewYork-Presbyterian Medical Group Queens offers comprehensive primary care services in multiple locations.",
        hasBrandMention: false,
        resultType: "local"
      },
      {
        rank: 2,
        url: "https://www.medexdtc.com/primary-care/",
        title: "Best Primary Care Doctor Queens, NY",
        description: "MedEx Diagnostic & Treatment Center provides top-rated primary care services in Queens, NY.",
        hasBrandMention: false,
        resultType: "local"
      },
      {
        rank: 3,
        url: "https://nyulangone.org/care-services/primary-care-services",
        title: "Primary Care Services",
        description: "NYU Langone's primary care physicians provide comprehensive healthcare services for adults and children.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.northwell.edu/find-care",
        title: "Find a doctor",
        description: "Northwell Health's doctor finder helps you locate primary care physicians and specialists in your area.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Men's health online query
  if (lowerQuery.includes("men's health online")) {
    return [
      {
        rank: 1,
        url: "https://www.menshealth.com/",
        title: "Men's Health - Fitness, Nutrition, Health, Sex, Style & Weight ...",
        description: "Men's Health magazine: your source for fitness, nutrition, health, sex, and lifestyle advice.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.everlywell.com/mens-health-online-support/?srsltid=AfmBOorGTZ9JZUTANdRw1h3Waa_3XyklUfH97tbC9p0ApkwoCaBrVzBF",
        title: "Men's Health Virtual Visit | Online Support for Men's Health",
        description: "Everlywell offers virtual visits for men's health concerns, providing convenient online support and treatment options.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.youtube.com/channel/UCwJfDTNqtM5n-dQBfuuHzYw",
        title: "Men's Health",
        description: "Official YouTube channel of Men's Health magazine, featuring fitness videos, workout tips, and health advice for men.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.instagram.com/menshealthmag/?hl=en",
        title: "Men's Health (@menshealthmag)",
        description: "Official Instagram account of Men's Health magazine, sharing fitness inspiration, nutrition tips, and lifestyle content.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Affordable women's clothing query
  if (lowerQuery.includes("affordable women's clothing")) {
    return [
      {
        rank: 1,
        url: "https://www.forever21.com/us/shop/catalog/category/f21/app-main",
        title: "Online Women's Clothing | Trendy & Affordable Fashion",
        description: "Forever 21 offers affordable and trendy women's clothing for all styles and occasions.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.sweetsaltclothing.com/clearance.html?srsltid=AfmBOorLkZqxvSbpj_iccozP1vgdfehoQPCa0XAe1BtJCkIvx7qkOht1",
        title: "Affordable Women's Clothing on Clearance",
        description: "Explore Sweet Salt Clothing's clearance section for affordable women's fashion at discounted prices.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.buzzfeed.com/maitlandquitmeyer/the-best-places-to-buy-inexpensive-clothes-online",
        title: "42 Best Inexpensive Online Clothing Stores Of 2025",
        description: "BuzzFeed's list of the best affordable online clothing stores for women in 2025.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.reddit.com/r/femalefashionadvice/comments/1b956dg/what_are_your_favorite_places_to_get_affordable/",
        title: "What are your favorite places to get affordable clothing from?",
        description: "Reddit discussion about favorite affordable women's clothing stores and brands.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Online furniture store query
  if (lowerQuery.includes("online furniture store")) {
    return [
      {
        rank: 1,
        url: "https://www.wayfair.com/",
        title: "Wayfair.com - Online Home Store for Furniture, Decor ...",
        description: "Shop Wayfair for A Zillion Things Home across all styles and budgets. 5,000 brands of furniture, lighting, cookware, and more. Free Shipping on most items.",
        hasBrandMention: brandName === "Wayfair",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.ikea.com/us/en/",
        title: "IKEA: Shop Affordable Home Furnishings & Home Goods",
        description: "IKEA offers well-designed, functional and affordable furniture and home goods for every room in your house.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.overstock.com/",
        title: "Explore the New Overstock",
        description: "Shop Overstock.com for furniture, home décor, area rugs, bedding, and more. Free shipping on all orders over $49.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.furniturevillage.co.uk/",
        title: "Furniture Village: The UK's Largest Independent Furniture ...",
        description: "Furniture Village offers a wide range of quality furniture for living room, dining room, bedroom, and more.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.cb2.com/?srsltid=AfmBOoqSSseldrFNHa8KzndCbmYW7-lBS2KY6sGQXNfulBjxg2mHP30R",
        title: "CB2: Modern Furniture and Home Decor",
        description: "CB2 offers modern furniture, home décor, and accessories designed for contemporary living.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Buy eyeglasses online query
  if (lowerQuery.includes("buy eyeglasses online")) {
    return [
      {
        rank: 1,
        url: "https://www.eyebuydirect.com/",
        title: "Eyebuydirect: Buy Prescription Glasses Online from $6",
        description: "Shop affordable prescription glasses online at Eyebuydirect. Find quality eyeglasses and sunglasses with prices starting at $6.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.glasses.com/?srsltid=AfmBOorxr1wHI90Tm1dKbBxB8ttxdeEhHOp1dePAGIMYjIBHEBXzUlTf",
        title: "Prescription Glasses and Sunglasses Online | Glasses.com®",
        description: "Shop prescription glasses and sunglasses online at Glasses.com. Choose from thousands of frames with fast shipping and free returns.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.framesdirect.com/",
        title: "Glasses Frames, Prescription Sunglasses & Eyeglasses ...",
        description: "Buy prescription glasses, sunglasses and contacts online. FramesDirect.com offers designer eyewear at discount prices.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.visionworks.com/storefront-navigation/glasses/all-glasses",
        title: "Buy Prescription Glasses Online",
        description: "Visionworks offers a wide variety of prescription glasses frames and lenses that you can buy online or in-store.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Glossier skincare query
  if (lowerQuery.includes("glossier skincare")) {
    return [
      {
        rank: 1,
        url: "https://www.glossier.com/en-pl/collections/skincare?srsltid=AfmBOop1DqkhyvQK6NJ8SipxZsEXRSR00auG7-NkBHVVQkQ-sfoOp1lN",
        title: "All Skincare",
        description: "Shop Glossier's complete collection of skincare products designed to nourish and enhance your skin.",
        hasBrandMention: brandName === "Glossier",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://uk.glossier.com/collections/skincare?srsltid=AfmBOoqUIcP9LRI1Y1Rz941gcZEcLPD3U5_dJ9d3SG3SCS0oA_ixILnb",
        title: "Skincare",
        description: "Glossier UK's skincare collection featuring cleansers, moisturizers, serums, and more for all skin types.",
        hasBrandMention: brandName === "Glossier",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.glossier.com/collections/skincare-sets?srsltid=AfmBOoqa4q7u2njCNA_GlPrhlHWPGcOXDhrAp_fg2sZM8HgLqOJYfJCF",
        title: "Skincare Sets",
        description: "Discover Glossier's curated skincare sets that combine their best-selling products for optimal results.",
        hasBrandMention: brandName === "Glossier",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.glossier.com/en-pl?srsltid=AfmBOooqLaT7unbgpiiQhYTEWU0Y1usCm0hSFfRa6t87kvm-p0kqPlnQ",
        title: "Milky Jelly Cleansing Balm",
        description: "Glossier's Milky Jelly Cleansing Balm gently removes makeup and impurities without stripping the skin.",
        hasBrandMention: brandName === "Glossier",
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://uk.glossier.com/collections/skincare-sets?srsltid=AfmBOoop9fUNzKztVb2GM7V8y3l5U7n_AVd5EdNHcotGm-_D4N7zdyGn",
        title: "Skincare Sets",
        description: "Glossier UK's selection of skincare sets designed to address different skin concerns and goals.",
        hasBrandMention: brandName === "Glossier",
        resultType: "organic"
      }
    ];
  }
  
  // Vuori clothing query
  if (lowerQuery.includes("vuori clothing")) {
    return [
      {
        rank: 1,
        url: "https://vuoriclothing.com/?srsltid=AfmBOoqfgAt2OBl0IH7MHRomKJG5NmjVuStO1MJWUw67fjp4nFt29iQ1",
        title: "Vuori: Athletic Clothing & Activewear Apparel for Performance",
        description: "Shop Vuori for premium performance apparel designed for active lifestyles. Built for movement, made to live in.",
        hasBrandMention: brandName === "Vuori",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.instagram.com/vuoriclothing/?hl=en",
        title: "Vuori (@vuoriclothing) • Instagram photos and videos",
        description: "Follow Vuori on Instagram for the latest collections, lifestyle inspiration, and brand updates.",
        hasBrandMention: brandName === "Vuori",
        resultType: "organic"
      }
    ];
  }
  
  // Beis luggage query
  if (lowerQuery.includes("beis luggage")) {
    return [
      {
        rank: 1,
        url: "https://beistravel.com/",
        title: "BÉIS Travel | The Ultimate Travel Essential | Luggage, Bags & More",
        description: "Shop BÉIS for stylish, functional travel essentials including luggage, travel bags, backpacks, and travel accessories.",
        hasBrandMention: brandName === "Beis Travel",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.nordstrom.com/brands/beis--19670/home/luggage?srsltid=AfmBOoqmLeaNBnJdUWdiKSVZge2JRhCaOWWwM90W002YNVkSvdpcqeNF",
        title: "Béis Luggage & Travel",
        description: "Shop Béis luggage and travel accessories at Nordstrom.com. Free shipping and returns available.",
        hasBrandMention: brandName === "Beis Travel",
        resultType: "organic"
      }
    ];
  }
  
  // Healthy cereal query
  if (lowerQuery.includes("healthy cereal")) {
    return [
      {
        rank: 1,
        url: "https://www.today.com/health/diet-fitness/healthiest-cereals-rcna137277",
        title: "What is the healthiest cereal? Dietitians share their favorites",
        description: "Nutritionists and dietitians reveal their picks for the healthiest cereals available in stores today.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.healthline.com/nutrition/15-healthiest-cereals",
        title: "The 14 Healthiest Cereals You Can Eat",
        description: "Healthline's guide to the 14 healthiest cereals based on nutritional content and expert recommendations.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/HealthyFood/comments/10etbrg/healthy_cereals/",
        title: "Healthy cereals? : r/HealthyFood",
        description: "Reddit discussion about healthy cereal options with recommendations from health-conscious users.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.cspinet.org/article/healthy-cereal-what-look-supermarket",
        title: "Healthy cereal: What to look for at the supermarket",
        description: "The Center for Science in the Public Interest provides guidance on choosing healthy cereals at the supermarket.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.eatingwell.com/dietitian-favorite-healthy-cereal-8650175",
        title: "I'm a Dietitian and This Is My Favorite Healthy Cereal",
        description: "A registered dietitian shares their top pick for the healthiest cereal and explains why it's a nutritious choice.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Vacation rentals query
  if (lowerQuery.includes("vacation rentals")) {
    return [
      {
        rank: 1,
        url: "https://www.hometogo.com/springfield/",
        title: "Springfield, MO Vacation Rentals",
        description: "Browse and book vacation rentals in Springfield, Missouri on HomeToGo. Find the best deals on cabins, cottages, and homes.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.vrbo.com/vacation-rentals/usa/missouri/springfield",
        title: "Springfield Vacation Rentals, Missouri: house rentals & more",
        description: "Explore Vrbo's collection of vacation rentals in Springfield, Missouri. Choose from houses, cabins, and more.",
        hasBrandMention: brandName === "Vrbo",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.expedia.com/Springfield-Vacation-Rentals.d602962.Travel-Guide-VacationRentals",
        title: "Springfield Vacation Rentals from $100",
        description: "Book your Springfield, MO vacation rental online. Browse vacation home rentals with Expedia, starting at $100 per night.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.springfieldmo.org/places-to-stay/vacation-rentals/",
        title: "Vacation Rentals | Springfield Missouri",
        description: "Find vacation rentals in Springfield, Missouri. From cozy cabins to spacious homes, find the perfect place for your stay.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.airbnb.com/springfield-mo/stays",
        title: "Springfield Places To Stay | Cabin and House Rentals",
        description: "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Marriott rewards program query
  if (lowerQuery.includes("marriott rewards program")) {
    return [
      {
        rank: 1,
        url: "https://www.marriott.com/loyalty.mi",
        title: "Discover Marriott Bonvoy | Join The Best Hotel Rewards ...",
        description: "Learn about Marriott Bonvoy, the rewards program that replaced Marriott Rewards, Ritz-Carlton Rewards, and Starwood Preferred Guest.",
        hasBrandMention: brandName === "Marriott Bonvoy",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.marriott.com/loyalty/member-benefits.mi",
        title: "Membership Levels & Benefits | Earn & Redeem Points",
        description: "Explore Marriott Bonvoy membership levels and benefits. Learn how to earn and redeem points for free nights, experiences, and more.",
        hasBrandMention: brandName === "Marriott Bonvoy",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi",
        title: "Join Marriott Bonvoy",
        description: "Sign up for Marriott Bonvoy, the hotel rewards program that lets you earn and redeem points at over 7,000 hotels worldwide.",
        hasBrandMention: brandName === "Marriott Bonvoy",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.marriott.com/loyalty/terms/default.mi",
        title: "Loyalty Program Terms & Conditions",
        description: "Read the terms and conditions for the Marriott Bonvoy loyalty program, including point earnings, redemptions, and elite status.",
        hasBrandMention: brandName === "Marriott Bonvoy",
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.nerdwallet.com/article/travel/marriott-bonvoy-program-the-complete-guide",
        title: "Marriott Bonvoy: What to Know Before You Book",
        description: "NerdWallet's comprehensive guide to the Marriott Bonvoy rewards program, including how to earn and redeem points effectively.",
        hasBrandMention: brandName === "Marriott Bonvoy",
        resultType: "organic"
      }
    ];
  }
  
  // Car rental alternatives query
  if (lowerQuery.includes("car rental alternatives")) {
    return [
      {
        rank: 1,
        url: "https://www.nerdwallet.com/article/travel/rental-car-alternatives",
        title: "3 Smart Rental Car Alternatives To Consider Booking",
        description: "NerdWallet's guide to car rental alternatives, including peer-to-peer car sharing services and other transportation options.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://turo.com/",
        title: "Turo car rental marketplace | Car rentals, reimagined",
        description: "Turo is the world's largest peer-to-peer car sharing marketplace where you can book any car you want from local hosts.",
        hasBrandMention: brandName === "Turo",
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.zipcar.com/",
        title: "Zipcar: Car Sharing Alternative for Daily and Hourly Car Rental",
        description: "Zipcar is the world's leading car sharing service offering self-service vehicles by the hour or day.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.reddit.com/r/Shoestring/comments/t0bnfi/any_cheap_rental_car_places_besides_turo/",
        title: "Any cheap rental car places besides Turo : r/Shoestring",
        description: "Reddit discussion about affordable car rental alternatives beyond Turo for budget travelers.",
        hasBrandMention: brandName === "Turo",
        resultType: "organic"
      }
    ];
  }
  
  // Flight deals newsletter query
  if (lowerQuery.includes("flight deals newsletter")) {
    return [
      {
        rank: 1,
        url: "https://www.going.com/",
        title: "Going™ | Formerly Scott's Cheap Flights | Flight Subscription",
        description: "Going (formerly Scott's Cheap Flights) finds cheap flights that are up to 90% off the regular price. Join over 2 million members and start saving on airfare.",
        hasBrandMention: brandName === "Scott's Cheap Flights",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://jacksflightclub.com/",
        title: "Jack's Flight Club | Cheap Flights, Flight Deals & Alerts",
        description: "Jack's Flight Club finds ridiculously cheap flight deals and sends them directly to your inbox. Free and Premium subscriptions available.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.theflightdeal.com/",
        title: "The Flight Deal – \"Just because it's a great fare doesn't ...\"",
        description: "The Flight Deal posts daily flight deals and travel deals from around the web. No subscription required.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.dailydrop.com/pro",
        title: "Daily Drop Pro | Never overpay for travel again",
        description: "Daily Drop Pro sends you personalized travel deals, including flight deals, hotel discounts, and more.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.airfarewatchdog.com/",
        title: "Airfarewatchdog: Cheap Flights & Airline Tickets [Compare ...",
        description: "Airfarewatchdog searches thousands of routes to find the lowest airfares. Free alerts sent when fares drop.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Selina hostel query
  if (lowerQuery.includes("selina hostel")) {
    return [
      {
        rank: 1,
        url: "https://www.selina.com/",
        title: "Selina",
        description: "Selina offers beautiful places to stay, travel, and work abroad indefinitely. With an extensive network of co-living and coworking spaces.",
        hasBrandMention: brandName === "Selina Hotels",
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://skift.com/2024/07/22/selina-collapses-in-liquidity-crisis-seeks-buyers/",
        title: "Selina Collapses in Liquidity Crisis, Seeks Buyers",
        description: "Skift reports on Selina's financial challenges and search for potential buyers amid liquidity crisis.",
        hasBrandMention: brandName === "Selina Hotels",
        resultType: "news"
      },
      {
        rank: 3,
        url: "https://duracatravels.com/selina-review/",
        title: "Selina Review: An Honest and Detailed ... - Duraca Travels",
        description: "Comprehensive review of Selina hostels worldwide, including amenities, pricing, and overall experience for digital nomads and travelers.",
        hasBrandMention: brandName === "Selina Hotels",
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.reddit.com/r/digitalnomad/comments/1ea7fsr/selina_is_collapsing/",
        title: "Selina is collapsing : r/digitalnomad",
        description: "Reddit discussion about Selina's business challenges and impact on digital nomads who frequent their properties.",
        hasBrandMention: brandName === "Selina Hotels",
        resultType: "organic"
      }
    ];
  }
  
  // Default fallback for any other query
  return [
    {
      rank: 1,
      url: `https://www.example.com/search?q=${encodeURIComponent(query)}`,
      title: `${query} | Search Results`,
      description: `Search results for "${query}". ${brandName ? `Information about ${brandName} and related topics.` : ""}`,
      hasBrandMention: !!brandName,
      resultType: "organic"
    },
    {
      rank: 2,
      url: `https://www.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g, '_'))}`,
      title: `${query} - Wikipedia`,
      description: `Wikipedia entry for "${query}". Learn about the history, features, and usage of ${query}.`,
      hasBrandMention: false,
      resultType: "organic"
    },
    {
      rank: 3,
      url: `https://www.industry-guide.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
      title: `${query} Guide | Industry Best Practices`,
      description: `Complete guide to ${query}. Expert advice, tips, and best practices for ${query} implementation.`,
      hasBrandMention: false,
      resultType: "organic"
    }
  ];
}

