
import { SearchResult, TraditionalSearchResults } from "./types";

interface StaticDataEntry {
  brand: string;
  keyword: string;
  resultTitles: string[];
  resultUrls: string[];
  brandMentions: number;
  queryRunTime: string;
}

const staticData: StaticDataEntry[] = [
  {
    brand: "Salesforce",
    keyword: "CRM software",
    resultTitles: [
      "What Is CRM Software? A Comprehensive Guide",
      "10 Best CRM Software Of 2025",
      "What is CRM? | Keap - Small Business CRM & Automation"
    ],
    resultUrls: [
      "https://www.salesforce.com/crm/what-is-crm/software/",
      "https://www.forbes.com/advisor/business/software/best-crm-software/",
      "https://keap.com/product/what-is-crm"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "HubSpot",
    keyword: "inbound marketing software",
    resultTitles: [
      "The Best B2B Inbound Marketing Software Tools",
      "Marketing Software for Businesses of Every Size",
      "HubSpot | Software & Tools for your Business - Homepage",
      "27 Inbound Marketing Tools To Drive More Warm Leads",
      "21 Best Inbound Marketing Tools for Diverse Needs"
    ],
    resultUrls: [
      "https://www.cobloom.com/blog/best-inbound-marketing-software-saas",
      "https://www.hubspot.com/products/marketing",
      "https://www.hubspot.com/",
      "https://www.warmly.ai/p/blog/26-inbound-marketing-tools",
      "https://www.sender.net/blog/inbound-marketing-tool/"
    ],
    brandMentions: 3,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Airtable",
    keyword: "best project management tools",
    resultTitles: [
      "The best free project management software in 2025",
      "15 Best Project Management Tools in 2025",
      "What is the best free project management tool, specifically ...",
      "25 Best Project Management Software Picked For 2025",
      "Top 21 project management tools: 2025 guide"
    ],
    resultUrls: [
      "https://zapier.com/blog/free-project-management-software/",
      "https://clickup.com/blog/best-project-management-tools/",
      "https://www.reddit.com/r/projectmanagement/comments/1b0lfvi/what_is_the_best_free_project_management_tool/",
      "https://thedigitalprojectmanager.com/tools/best-project-management-software/",
      "https://www.wrike.com/project-management-guide/faq/what-are-project-management-tools/"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Coda",
    keyword: "Coda app",
    resultTitles: [
      "Coda: Your all-in-one collaborative workspace.",
      "Coda - Apps on Google Play",
      "Is CODA Just a Gimmick? : r/codaio",
      "Coda on the App Store"
    ],
    resultUrls: [
      "https://coda.io/",
      "https://play.google.com/store/apps/details?id=io.coda.codaapp&hl=en_US",
      "https://www.reddit.com/r/codaio/comments/1bftq2y/is_coda_just_a_gimmick/",
      "https://apps.apple.com/us/app/coda/id1397968110"
    ],
    brandMentions: 4,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Monday.com",
    keyword: "project management software",
    resultTitles: [
      "25 Best Project Management Software Picked For 2025",
      "The best free project management software in 2025",
      "Project Management Software",
      "25 Best Free Project Management Software: Tools to Try in ...",
      "Manage your team's work, projects, & tasks online • Asana ..."
    ],
    resultUrls: [
      "https://thedigitalprojectmanager.com/tools/best-project-management-software/",
      "https://zapier.com/blog/free-project-management-software/",
      "https://www.microsoft.com/en-us/microsoft-365/project/project-management-software",
      "https://clickup.com/blog/free-project-management-software/",
      "https://asana.com/"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Highspot",
    keyword: "sales enablement platform",
    resultTitles: [
      "The Definitive Guide to Sales Enablement for 2025",
      "Best Revenue Enablement Platforms Reviews 2025",
      "What Is Sales Enablement Software?"
    ],
    resultUrls: [
      "https://www.highspot.com/sales-enablement/",
      "https://www.gartner.com/reviews/market/revenue-enablement-platforms",
      "https://www.salesforce.com/sales/enablement/software/"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Zocdoc",
    keyword: "find a doctor",
    resultTitles: [
      "Healthgrades | Find a Doctor - Doctor Reviews - Online Doctor ...",
      "Find a Doctor – Specialist or Dr Finder | bcbs.com",
      "Zocdoc | Find a Doctor Near You | Book Doctors Online",
      "Find A Doctor or Practice Location",
      "Find a Doctor"
    ],
    resultUrls: [
      "https://www.healthgrades.com/",
      "https://www.bcbs.com/member-services/find-a-doctor",
      "https://www.zocdoc.com/",
      "https://www.pennmedicine.org/providers",
      "https://www.atlantichealth.org/find-a-doctor"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "GoodRx",
    keyword: "prescription drug prices",
    resultTitles: [
      "Trump Ends Push to Slash Prescription Drug Costs",
      "GoodRx: Prescription Prices, Coupons & Pharmacy Information",
      "HHS Announces 15 Additional Drugs Selected for ..."
    ],
    resultUrls: [
      "https://www.thecardiologyadvisor.com/news/trump-ends-push-to-slash-prescription-drug-costs/",
      "https://www.goodrx.com/",
      "https://www.cms.gov/newsroom/press-releases/hhs-announces-15-additional-drugs-selected-medicare-drug-price-negotiations-continued-effort-lower"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Hims & Hers Health",
    keyword: "telehealth services",
    resultTitles: [
      "The Best Telehealth Services - Telehealth.com",
      "Telehealth.HHS.gov: Learn how to access or provide ...",
      "MinuteClinic Virtual Care",
      "List of Telehealth Services",
      "Teladoc Health: Telehealth & Telemedicine Provider"
    ],
    resultUrls: [
      "https://www.telehealth.com/",
      "https://telehealth.hhs.gov/",
      "https://www.cvs.com/minuteclinic/virtual-care",
      "https://www.cms.gov/medicare/coverage/telehealth/list-services",
      "https://www.teladochealth.com/"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "One Medical",
    keyword: "primary care near me",
    resultTitles: [
      "Queens Primary Care and Family Medicine",
      "Best Primary Care Doctor Queens, NY",
      "Primary Care Services",
      "Find a doctor"
    ],
    resultUrls: [
      "https://www.nyp.org/medicalgroups/queens/primary-care",
      "https://www.medexdtc.com/primary-care/",
      "https://nyulangone.org/care-services/primary-care-services",
      "https://www.northwell.edu/find-care"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Roman (Ro Health)",
    keyword: "men's health online",
    resultTitles: [
      "Men's Health - Fitness, Nutrition, Health, Sex, Style & Weight ...",
      "Men's Health Virtual Visit | Online Support for Men's Health",
      "Men's Health",
      "Men's Health (@menshealthmag)"
    ],
    resultUrls: [
      "https://www.menshealth.com/",
      "https://www.everlywell.com/mens-health-online-support/?srsltid=AfmBOorGTZ9JZUTANdRw1h3Waa_3XyklUfH97tbC9p0ApkwoCaBrVzBF",
      "https://www.youtube.com/channel/UCwJfDTNqtM5n-dQBfuuHzYw",
      "https://www.instagram.com/menshealthmag/?hl=en"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Shein",
    keyword: "affordable women's clothing",
    resultTitles: [
      "Online Women's Clothing | Trendy & Affordable Fashion",
      "Affordable Women's Clothing on Clearance",
      "42 Best Inexpensive Online Clothing Stores Of 2025",
      "What are your favorite places to get affordable clothing from?"
    ],
    resultUrls: [
      "https://www.forever21.com/us/shop/catalog/category/f21/app-main",
      "https://www.sweetsaltclothing.com/clearance.html?srsltid=AfmBOorLkZqxvSbpj_iccozP1vgdfehoQPCa0XAe1BtJCkIvx7qkOht1",
      "https://www.buzzfeed.com/maitlandquitmeyer/the-best-places-to-buy-inexpensive-clothes-online",
      "https://www.reddit.com/r/femalefashionadvice/comments/1b956dg/what_are_your_favorite_places_to_get_affordable/"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Wayfair",
    keyword: "online furniture store",
    resultTitles: [
      "Wayfair.com - Online Home Store for Furniture, Decor ...",
      "IKEA: Shop Affordable Home Furnishings & Home Goods",
      "Explore the New Overstock",
      "Furniture Village: The UK's Largest Independent Furniture ...",
      "CB2: Modern Furniture and Home Decor"
    ],
    resultUrls: [
      "https://www.wayfair.com/",
      "https://www.ikea.com/us/en/",
      "https://www.overstock.com/",
      "https://www.furniturevillage.co.uk/",
      "https://www.cb2.com/?srsltid=AfmBOoqSSseldrFNHa8KzndCbmYW7-lBS2KY6sGQXNfulBjxg2mHP30R"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:03"
  },
  {
    brand: "Warby Parker",
    keyword: "buy eyeglasses online",
    resultTitles: [
      "Eyebuydirect: Buy Prescription Glasses Online from $6",
      "Prescription Glasses and Sunglasses Online | Glasses.com®",
      "Glasses Frames, Prescription Sunglasses & Eyeglasses ...",
      "Buy Prescription Glasses Online"
    ],
    resultUrls: [
      "https://www.eyebuydirect.com/",
      "https://www.glasses.com/?srsltid=AfmBOorxr1wHI90Tm1dKbBxB8ttxdeEhHOp1dePAGIMYjIBHEBXzUlTf",
      "https://www.framesdirect.com/",
      "https://www.visionworks.com/storefront-navigation/glasses/all-glasses"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Glossier",
    keyword: "Glossier skincare",
    resultTitles: [
      "All Skincare",
      "Skincare",
      "Skincare Sets",
      "Milky Jelly Cleansing Balm",
      "Skincare Sets"
    ],
    resultUrls: [
      "https://www.glossier.com/en-pl/collections/skincare?srsltid=AfmBOop1DqkhyvQK6NJ8SipxZsEXRSR00auG7-NkBHVVQkQ-sfoOp1lN",
      "https://uk.glossier.com/collections/skincare?srsltid=AfmBOoqUIcP9LRI1Y1Rz941gcZEcLPD3U5_dJ9d3SG3SCS0oA_ixILnb",
      "https://www.glossier.com/collections/skincare-sets?srsltid=AfmBOoqa4q7u2njCNA_GlPrhlHWPGcOXDhrAp_fg2sZM8HgLqOJYfJCF",
      "https://www.glossier.com/en-pl?srsltid=AfmBOooqLaT7unbgpiiQhYTEWU0Y1usCm0hSFfRa6t87kvm-p0kqPlnQ",
      "https://uk.glossier.com/collections/skincare-sets?srsltid=AfmBOoop9fUNzKztVb2GM7V8y3l5U7n_AVd5EdNHcotGm-_D4N7zdyGn"
    ],
    brandMentions: 1,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Vuori",
    keyword: "Vuori clothing",
    resultTitles: [
      "Vuori: Athletic Clothing & Activewear Apparel for Performance",
      "Vuori (@vuoriclothing) • Instagram photos and videos"
    ],
    resultUrls: [
      "https://vuoriclothing.com/?srsltid=AfmBOoqfgAt2OBl0IH7MHRomKJG5NmjVuStO1MJWUw67fjp4nFt29iQ1",
      "https://www.instagram.com/vuoriclothing/?hl=en"
    ],
    brandMentions: 2,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Beis Travel",
    keyword: "Beis luggage",
    resultTitles: [
      "BÉIS Travel | The Ultimate Travel Essential | Luggage, Bags & More",
      "Béis Luggage & Travel"
    ],
    resultUrls: [
      "https://beistravel.com/",
      "https://www.nordstrom.com/brands/beis--19670/home/luggage?srsltid=AfmBOoqmLeaNBnJdUWdiKSVZge2JRhCaOWWwM90W002YNVkSvdpcqeNF"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Magic Spoon",
    keyword: "healthy cereal",
    resultTitles: [
      "What is the healthiest cereal? Dietitians share their favorites",
      "The 14 Healthiest Cereals You Can Eat",
      "Healthy cereals? : r/HealthyFood",
      "Healthy cereal: What to look for at the supermarket",
      "I'm a Dietitian and This Is My Favorite Healthy Cereal"
    ],
    resultUrls: [
      "https://www.today.com/health/diet-fitness/healthiest-cereals-rcna137277",
      "https://www.healthline.com/nutrition/15-healthiest-cereals",
      "https://www.reddit.com/r/HealthyFood/comments/10etbrg/healthy_cereals/",
      "https://www.cspinet.org/article/healthy-cereal-what-look-supermarket",
      "https://www.eatingwell.com/dietitian-favorite-healthy-cereal-8650175"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Vrbo",
    keyword: "vacation rentals",
    resultTitles: [
      "Springfield, MO Vacation Rentals",
      "Springfield Vacation Rentals, Missouri: house rentals & more",
      "Springfield Vacation Rentals from $100",
      "Vacation Rentals | Springfield Missouri",
      "Springfield Places To Stay | Cabin and House Rentals"
    ],
    resultUrls: [
      "https://www.hometogo.com/springfield/",
      "https://www.vrbo.com/vacation-rentals/usa/missouri/springfield",
      "https://www.expedia.com/Springfield-Vacation-Rentals.d602962.Travel-Guide-VacationRentals",
      "https://www.springfieldmo.org/places-to-stay/vacation-rentals/",
      "https://www.airbnb.com/springfield-mo/stays"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Marriott Bonvoy",
    keyword: "Marriott rewards program",
    resultTitles: [
      "Discover Marriott Bonvoy | Join The Best Hotel Rewards ...",
      "Membership Levels & Benefits | Earn & Redeem Points",
      "Join Marriott Bonvoy",
      "Loyalty Program Terms & Conditions",
      "Marriott Bonvoy: What to Know Before You Book"
    ],
    resultUrls: [
      "https://www.marriott.com/loyalty.mi",
      "https://www.marriott.com/loyalty/member-benefits.mi",
      "https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi",
      "https://www.marriott.com/loyalty/terms/default.mi",
      "https://www.nerdwallet.com/article/travel/marriott-bonvoy-program-the-complete-guide"
    ],
    brandMentions: 4,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Turo",
    keyword: "car rental alternatives",
    resultTitles: [
      "3 Smart Rental Car Alternatives To Consider Booking",
      "Turo car rental marketplace | Car rentals, reimagined",
      "Zipcar: Car Sharing Alternative for Daily and Hourly Car Rental",
      "Any cheap rental car places besides Turo : r/Shoestring"
    ],
    resultUrls: [
      "https://www.nerdwallet.com/article/travel/rental-car-alternatives",
      "https://turo.com/",
      "https://www.zipcar.com/",
      "https://www.reddit.com/r/Shoestring/comments/t0bnfi/any_cheap_rental_car_places_besides_turo/"
    ],
    brandMentions: 3,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Scott's Cheap Flights",
    keyword: "flight deals newsletter",
    resultTitles: [
      "Going™ | Formerly Scott's Cheap Flights | Flight Subscription",
      "Jack's Flight Club | Cheap Flights, Flight Deals & Alerts",
      "The Flight Deal – \"Just because it's a great fare doesn't ...\"",
      "Daily Drop Pro | Never overpay for travel again",
      "Airfarewatchdog: Cheap Flights & Airline Tickets [Compare ..."
    ],
    resultUrls: [
      "https://www.going.com/",
      "https://jacksflightclub.com/",
      "https://www.theflightdeal.com/",
      "https://www.dailydrop.com/pro",
      "https://www.airfarewatchdog.com/"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  },
  {
    brand: "Selina Hotels",
    keyword: "Selina hostel",
    resultTitles: [
      "Selina",
      "Selina Collapses in Liquidity Crisis, Seeks Buyers",
      "Selina Review: An Honest and Detailed ... - Duraca Travels",
      "Selina is collapsing : r/digitalnomad"
    ],
    resultUrls: [
      "https://www.selina.com/",
      "https://skift.com/2024/07/22/selina-collapses-in-liquidity-crisis-seeks-buyers/",
      "https://duracatravels.com/selina-review/",
      "https://www.reddit.com/r/digitalnomad/comments/1ea7fsr/selina_is_collapsing/"
    ],
    brandMentions: 0,
    queryRunTime: "2025-03-13 23:34:04"
  }
];

/**
 * Gets static search results for a specified brand and keyword
 */
export function getStaticTraditionalResults(brand: string, keyword: string): TraditionalSearchResults {
  // Find the matching data entry
  const entry = staticData.find(item => 
    item.brand.toLowerCase() === brand.toLowerCase() && 
    item.keyword.toLowerCase() === keyword.toLowerCase()
  );

  if (!entry) {
    console.log(`No static data found for brand: ${brand}, keyword: ${keyword}`);
    return {
      searchEngine: "Google",
      query: keyword,
      source: "static",
      brandMentions: 0,
      retrievalDate: new Date().toISOString(),
      topResults: []
    };
  }

  // Convert to SearchResult objects
  const searchResults: SearchResult[] = [];
  for (let i = 0; i < entry.resultTitles.length; i++) {
    if (entry.resultTitles[i] && entry.resultUrls[i]) {
      searchResults.push({
        rank: i + 1,
        url: entry.resultUrls[i],
        title: entry.resultTitles[i],
        description: `Search result for "${keyword}" related to ${entry.resultTitles[i].substring(0, 40)}...`,
        hasBrandMention: entry.resultTitles[i].toLowerCase().includes(brand.toLowerCase()) || 
                         entry.resultUrls[i].toLowerCase().includes(brand.toLowerCase().replace(/\s+/g, '')),
        resultType: "organic"
      });
    }
  }

  return {
    searchEngine: "Google",
    query: keyword,
    source: "static",
    brandMentions: entry.brandMentions,
    retrievalDate: entry.queryRunTime,
    topResults: searchResults
  };
}
