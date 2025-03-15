
import { SearchResult } from "../types";

/**
 * Get Vuori specific search results
 */
export function getVuoriResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Vuori clothing specific results
  if (lowerQuery === "vuori clothing") {
    return [
      {
        rank: 1,
        url: "https://vuoriclothing.com/",
        title: "Vuori: Athletic Clothing & Activewear Apparel for Performance",
        description: "Vuori's official website for athletic clothing and activewear apparel for men and women, designed for performance and comfort.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://vuoriclothing.com.au/collections/womens-sale",
        title: "Women's Clothing Sale on Workout & Athleisure Wear | Vuori",
        description: "Shop Vuori's sale on women's workout clothes, athleisure wear, and performance apparel.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://vuoriclothing.com/collections/womens",
        title: "Women's Workout & Athletic Clothes | Activewear | Vuori",
        description: "Shop Vuori's collection of women's workout clothes, athletic wear, and activewear designed for comfort and performance.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Vuori joggers specific results
  if (lowerQuery === "vuori joggers") {
    return [
      {
        rank: 1,
        url: "https://vuoriclothing.com/collections/womens-joggers",
        title: "Women's Joggers | Sweatpants and Joggers with Pockets | Vuori",
        description: "Shop Vuori's collection of women's joggers, sweatpants, and lounge pants with practical pockets and comfortable design.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.rei.com/product/119945/vuori-performance-jogger-pants-womens",
        title: "Vuori Performance Jogger Pants - Women's | REI Co-op",
        description: "REI's product page for Vuori Performance Jogger Pants for women, featuring details, specifications, and reviews.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://vuoriclothing.com/collections/joggers",
        title: "Men's Joggers: Men's Sweatpants & Joggers with Pockets | Vuori",
        description: "Shop Vuori's collection of men's joggers, sweatpants, and lounge pants designed for comfort and style.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Vuori vs Lululemon specific results
  if (lowerQuery === "vuori vs lululemon") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/vuoriclothing/comments/1cw3k3c/difference_between_vuori_alo_lululemon/",
        title: "Difference between Vuori / Alo / Lululemon? : r/vuoriclothing",
        description: "Reddit discussion comparing Vuori, Alo, and Lululemon athletic wear brands.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.menshealth.com/style/a62951340/vuori-vs-lululemon/",
        title: "Vuori vs. Lululemon: We Tested to Find Which Brand Makes the Best",
        description: "Men's Health comparison of Vuori and Lululemon, with product testing and detailed analysis.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/lululemon/comments/17t6qbs/today_i_shopped_lulu_vuori_and_athleta_my_hot/",
        title: "Today I shopped lulu, vuori and Athleta. My hot takes no one asked...",
        description: "Reddit user's review and comparison of shopping experiences at Lululemon, Vuori, and Athleta.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
