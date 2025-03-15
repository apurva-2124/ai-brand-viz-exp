
import { SearchResult } from "../types";

/**
 * Get Glossier specific search results
 */
export function getGlossierResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Glossier skincare specific results
  if (lowerQuery === "glossier skincare") {
    return [
      {
        rank: 1,
        url: "https://www.glossier.com/",
        title: "Glossier",
        description: "Glossier's official website for skincare, makeup, and beauty products designed with a skin-first philosophy.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://uk.glossier.com/collections/skincare",
        title: "Skincare – Glossier",
        description: "Glossier UK's collection of skincare products, including cleansers, serums, moisturizers, and more.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.glossier.com/collections/skincare",
        title: "All Skincare – Glossier",
        description: "Browse Glossier's complete collection of skincare products for all skin types and concerns.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Glossier makeup specific results
  if (lowerQuery === "glossier makeup") {
    return [
      {
        rank: 1,
        url: "https://www.glossier.com/collections/makeup",
        title: "Makeup – Glossier",
        description: "Glossier's collection of makeup products, including foundation, concealer, blush, and more.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://uk.glossier.com/collections/makeup-sets",
        title: "Makeup Sets – Glossier",
        description: "Glossier UK's makeup sets and collections, offering value and convenience for makeup enthusiasts.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.glossier.com/",
        title: "Glossier",
        description: "Glossier's official website for skincare, makeup, and beauty products designed with a skin-first philosophy.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Glossier reviews specific results
  if (lowerQuery === "glossier reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/Sephora/comments/1133x01/in_depth_glossier_review_ft_years_of_thoughts/",
        title: "In depth Glossier review ft. Years of thoughts! : r/Sephora",
        description: "Detailed Reddit review of Glossier products from a long-time user, covering multiple products over several years.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.kaylainthecity.com/2019/06/13/glossier-review/",
        title: "Glossier Review: My Honest Review of Popular Glossier Products",
        description: "Blogger's honest review of popular Glossier products, including pros, cons, and overall impressions.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/Makeup/comments/129sg08/is_glossier_makeup_worth_it/",
        title: "Is glossier makeup worth it? : r/Makeup",
        description: "Reddit discussion about whether Glossier makeup products are worth the price, with user reviews and opinions.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
