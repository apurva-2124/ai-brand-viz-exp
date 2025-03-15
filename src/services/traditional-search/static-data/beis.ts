
import { SearchResult } from "../types";

/**
 * Get Beis Travel specific search results
 */
export function getBeisResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Beis luggage specific results
  if (lowerQuery === "beis luggage") {
    return [
      {
        rank: 1,
        url: "https://beistravel.com/",
        title: "BÉIS Travel | The Ultimate Travel Essential | Luggage, Bags & More",
        description: "Shop BÉIS for stylish, functional travel essentials including luggage, bags, and accessories designed for modern travelers.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://uk.beistravel.com/collections/luggage%20",
        title: "Suitcases & Luggage - Beis Travel UK",
        description: "Browse BÉIS Travel UK's collection of suitcases and luggage designed for style and functionality.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://beistravel.com/collections/luggage",
        title: "Luggage - Check-In & Carry-On Luggage - Beis",
        description: "Shop BÉIS's collection of check-in and carry-on luggage designed for modern travelers.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Beis weekender bag specific results
  if (lowerQuery === "beis weekender bag") {
    return [
      {
        rank: 1,
        url: "https://beistravel.com/products/the-weekender-in-black",
        title: "BÉIS 'The Weekender' in Black - Black Travel Bag & Overnight Bags",
        description: "Shop BÉIS's signature 'The Weekender' bag in black, perfect for weekend getaways and short trips.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://eu.beistravel.com/products/the-weekender-in-beige",
        title: "BÉIS 'The Weekender' in Beige - Beige Travel Bag & Overnight Bags",
        description: "Shop BÉIS's signature 'The Weekender' bag in beige for European travelers.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://beistravel.com/collections/weekender",
        title: "Weekender Bags - Weekend Bags & Overnight Travel Bags - Beis",
        description: "Shop BÉIS's collection of weekender bags and overnight travel bags for short trips and getaways.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Beis vs Away specific results
  if (lowerQuery === "beis vs away") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/travel/comments/qq3le3/looking_for_new_luggage_beis_vs_away/",
        title: "looking for new luggage. beis vs away? : r/travel",
        description: "Reddit discussion comparing BÉIS and Away luggage brands for travelers looking to make a purchase.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.housebeautiful.com/shopping/home-accessories/a45790589/beis-vs-away-luggage-guide/",
        title: "Béis vs. Away 2025: Which Luggage Brand Is Better?",
        description: "House Beautiful's comprehensive comparison of BÉIS and Away luggage brands for 2025.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/handbags/comments/17mket3/beis_vs_away_vs_monos_carry_on/",
        title: "Beis vs Away vs Monos carry on? : r/handbags",
        description: "Reddit comparison of BÉIS, Away, and Monos carry-on luggage options.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
