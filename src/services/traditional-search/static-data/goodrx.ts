
import { SearchResult } from "../types";

/**
 * Get GoodRx specific search results
 */
export function getGoodRxResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // GoodRx coupon specific results
  if (lowerQuery === "goodrx coupon") {
    return [
      {
        rank: 1,
        url: "https://www.goodrx.com/",
        title: "GoodRx: Prescription Prices, Coupons & Pharmacy Information",
        description: "Compare prescription drug prices and find coupons at more than 70,000 US pharmacies. Save up to 80% on prescriptions with GoodRx.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.goodrx.com/search",
        title: "Drug Price Search, Find Prescription Coupons - GoodRx",
        description: "Search for your prescription medication and find coupons to save at your local pharmacy with GoodRx.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.goodrx.com/corporate/business/heres-how-to-use-a-goodrx-coupon-with-your-over-the-counter-medication",
        title: "How to Use a GoodRx Coupon with Your Over-The-Counter...",
        description: "Learn how to use GoodRx coupons for over-the-counter medications to save money at the pharmacy.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // GoodRx vs SingleCare specific results
  if (lowerQuery === "goodrx vs singlecare") {
    return [
      {
        rank: 1,
        url: "https://smartasset.com/personal-finance/singlecare-vs-goodrx",
        title: "SingleCare vs. GoodRx: Which Is Better?",
        description: "A detailed comparison of SingleCare and GoodRx prescription discount services to help you save money on medications.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.singlecare.com/pharmacists",
        title: "Free Prescription Savings Card Preferred by Pharmacists",
        description: "SingleCare's free prescription savings card can help you save up to 80% on prescription medications at participating pharmacies.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://hidrb.com/resources/the-best-prescription-discount-card-singlecare-vs-goodrx",
        title: "The best drug discount card: SingleCare vs. GoodRx - Dr. B",
        description: "Dr. B's comparison of SingleCare and GoodRx prescription discount cards to help you choose the best option.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Prescription drug prices specific results
  if (lowerQuery === "prescription drug prices") {
    return [
      {
        rank: 1,
        url: "https://www.medicare.gov/basics/costs/help/drug-costs",
        title: "Help with drug costs | Medicare",
        description: "Learn about Medicare programs and other resources that can help you pay for prescription drugs.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.thecardiologyadvisor.com/news/trump-ends-push-to-slash-prescription-drug-costs/",
        title: "Trump Ends Push to Slash Prescription Drug Costs",
        description: "Latest news on federal efforts to reduce prescription drug prices.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.dshs.texas.gov/prescription-drug-price-disclosure-program",
        title: "Prescription Drug Price Disclosure Program | Texas DSHS",
        description: "Information about Texas' prescription drug price disclosure program and requirements for pharmaceutical manufacturers.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 4,
        url: "https://www.cms.gov/newsroom/press-releases/hhs-announces-15-additional-drugs-selected-medicare-drug-price-negotiations-continued-effort-lower",
        title: "HHS Announces 15 Additional Drugs Selected for Medicare Drug...",
        description: "Press release about Medicare drug price negotiations and efforts to lower prescription costs.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 5,
        url: "https://www.goodrx.com/",
        title: "GoodRx: Prescription Prices, Coupons & Pharmacy Information",
        description: "Compare prescription drug prices and find coupons at more than 70,000 US pharmacies. Save up to 80% on prescriptions with GoodRx.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
