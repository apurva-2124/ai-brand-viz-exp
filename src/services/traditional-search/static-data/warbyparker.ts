
import { SearchResult } from "../types";

/**
 * Get Warby Parker specific search results
 */
export function getWarbyParkerResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Warby Parker frames specific results
  if (lowerQuery === "warby parker frames") {
    return [
      {
        rank: 1,
        url: "https://www.warbyparker.com/",
        title: "Warby Parker: Eyewear Online | We've Got Your Eyes Covered",
        description: "Warby Parker offers designer eyeglasses, sunglasses, and contacts. Shop online or in-store with free shipping and returns.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://ca.warbyparker.com/eyeglasses",
        title: "Prescription Eyeglasses Online | Warby Parker",
        description: "Browse Warby Parker's collection of eyeglasses for men and women. Find frames that suit your style with affordable prices.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.warbyparker.com/eyeglasses",
        title: "Prescription Eyeglasses Online | Warby Parker",
        description: "Shop Warby Parker's eyeglasses collection, with stylish and affordable frames for every face shape.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Warby Parker vs Zenni specific results
  if (lowerQuery === "warby parker vs zenni") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/glasses/comments/hnh0iy/zenni_vs_warby_parker/",
        title: "Zenni vs Warby Parker : r/glasses",
        description: "Reddit discussion comparing Zenni and Warby Parker eyeglasses in terms of quality, price, and service.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.healthline.com/health/warby-parker-vs-zenni",
        title: "Warby Parker vs. Zenni: Pros & Cons, Differences, Reputation",
        description: "Healthline's comparison of Warby Parker and Zenni eyewear, including product offerings, pricing, and overall value.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/Frugal/comments/kzzspb/any_experience_ordering_from_zenni_eyebuydirect/",
        title: "Any experience ordering from Zenni, EyeBuyDirect, or Warby Parker...",
        description: "Frugal Reddit users sharing their experiences with various online eyewear retailers.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Buy eyeglasses online specific results
  if (lowerQuery === "buy eyeglasses online") {
    return [
      {
        rank: 1,
        url: "https://www.warbyparker.com/eyeglasses",
        title: "Prescription Eyeglasses Online | Warby Parker",
        description: "Shop Warby Parker's eyeglasses collection, with stylish and affordable frames for every face shape.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.framesdirect.com/",
        title: "Glasses Frames, Prescription Sunglasses & Eyeglasses Online...",
        description: "FramesDirect.com offers a wide selection of designer eyeglasses, prescription sunglasses, and contact lenses online.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.eyebuydirect.com/",
        title: "Eyebuydirect: Buy Prescription Glasses Online from $6",
        description: "Eyebuydirect offers affordable prescription glasses and sunglasses online, with frames starting from just $6.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
