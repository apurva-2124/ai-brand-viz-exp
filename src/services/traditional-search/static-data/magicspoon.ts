
import { SearchResult } from "../types";

/**
 * Get Magic Spoon specific search results
 */
export function getMagicSpoonResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Magic Spoon flavors specific results
  if (lowerQuery === "magic spoon flavors") {
    return [
      {
        rank: 1,
        url: "https://magicspoon.com/products/variety-pack-cereal-case",
        title: "Magic Spoon Variety Pack - 4 Boxes | High-Protein, Keto Cereal",
        description: "Shop Magic Spoon's variety pack featuring 4 different flavors of high-protein, keto-friendly cereal.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/1200isplenty/comments/174jwsu/has_anyone_tried_magic_spoon_cereal/",
        title: "Has anyone tried Magic Spoon cereal? : r/1200isplenty",
        description: "Reddit discussion about Magic Spoon cereal flavors, nutrition, and taste experiences.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://magicspoon.com/collections/all-products",
        title: "All",
        description: "Browse Magic Spoon's complete collection of cereal flavors and products.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Magic Spoon reviews specific results
  if (lowerQuery === "magic spoon reviews") {
    return [
      {
        rank: 1,
        url: "https://magicspoon.com/",
        title: "Magic Spoon Cereal: High Protein, Keto-Friendly, 0g Sugar Cereal",
        description: "Magic Spoon's official website for high-protein, keto-friendly cereal with 0g sugar.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/1200isplenty/comments/174jwsu/has_anyone_tried_magic_spoon_cereal/",
        title: "Has anyone tried Magic Spoon cereal? : r/1200isplenty",
        description: "Reddit discussion with user reviews and experiences with Magic Spoon cereal.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.nytimes.com/wirecutter/reviews/magic-spoon-cereal-review/",
        title: "Magic Spoon Cereal Review: A Not-So-Bad Option for Folks With...",
        description: "Wirecutter's detailed review of Magic Spoon cereal for those with dietary restrictions.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Healthy cereal specific results
  if (lowerQuery === "healthy cereal") {
    return [
      {
        rank: 1,
        url: "https://www.cspinet.org/article/healthy-cereal-what-look-supermarket",
        title: "Healthy cereal: What to look for at the supermarket | Center for...",
        description: "Guide to choosing healthy cereals at the supermarket with nutrition considerations.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/HealthyFood/comments/10etbrg/healthy_cereals/",
        title: "Healthy cereals? : r/HealthyFood",
        description: "Reddit discussion about healthy cereal options and recommendations.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.today.com/health/diet-fitness/healthiest-cereals-rcna137277",
        title: "10 Healthiest Cereals That Taste Good, According To Dietitians",
        description: "Dietitian-approved healthy cereals that also taste good, with nutrition information.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
