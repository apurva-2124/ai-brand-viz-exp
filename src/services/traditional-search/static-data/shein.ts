
import { SearchResult } from "../types";

/**
 * Get Shein specific search results
 */
export function getSheinResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Shein dresses specific results
  if (lowerQuery === "shein dresses") {
    return [
      {
        rank: 1,
        url: "https://www.shein.com/women-dresses-c-1727.html",
        title: "Women's Dresses | Trendy Fashion Dresses | SHEIN USA",
        description: "Shop SHEIN's collection of trendy women's dresses, including casual, formal, and party styles at affordable prices.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://us.shein.com/women-dresses-c-1727.html",
        title: "Women's Dresses | Trendy Fashion Dresses | SHEIN USA",
        description: "Shop SHEIN's US collection of women's dresses in various styles, colors, and sizes.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://m.shein.com/za/style/Women-Dresses-sc-00106372.html",
        title: "| Fashion | SHEIN South Africa",
        description: "SHEIN South Africa's collection of women's fashion dresses and clothing.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Shein reviews specific results
  if (lowerQuery === "shein reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/femalefashionadvice/comments/ljknjh/thoughts_on_shein/",
        title: "Thoughts on Shein? : r/femalefashionadvice",
        description: "Reddit discussion with user reviews and experiences shopping with Shein.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://thehappyarkansan.com/blog/shein-review/",
        title: "My Honest Review Of SHEIN After Getting Multiple Orders From The...",
        description: "Blogger's detailed review of Shein clothing quality, shipping, and overall shopping experience.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/FrugalFemaleFashion/comments/15niiki/shein_temu_etc_whats_up_with_the_5_star_reviews/",
        title: "Shein, Temu, etc. - What's up with the 5 star reviews for...",
        description: "Reddit discussion about the authenticity of Shein and Temu reviews.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Affordable women's clothing specific results
  if (lowerQuery === "affordable women's clothing") {
    return [
      {
        rank: 1,
        url: "https://www.shein.com/women-apparel-c-2030.html",
        title: "SHEIN Women's Clothing | Affordable Fashion | SHEIN USA",
        description: "Shop SHEIN's collection of affordable women's clothing, featuring trendy styles at budget-friendly prices.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/femalefashionadvice/comments/1b956dg/what_are_your_favorite_places_to_get_affordable/",
        title: "What are your favorite places to get affordable clothing from? : r...",
        description: "Reddit discussion about affordable women's clothing stores and brands.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.fashionnova.com/",
        title: "Fashion Nova | Fashion Online For Women | Affordable Women's...",
        description: "Fashion Nova's online store for affordable women's clothing, dresses, jeans, and accessories.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
