
import { SearchResult } from "../types";

/**
 * Get Selina Hotels specific search results
 */
export function getSelinaResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Selina hostel specific results
  if (lowerQuery === "selina hostel") {
    return [
      {
        rank: 1,
        url: "https://www.selina.com/",
        title: "Selina",
        description: "Selina's official website for booking hostels, hotels, and coworking spaces worldwide.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/digitalnomad/comments/17twi3m/who_stays_at_selina_hostels_the_price_is_yikes/",
        title: "who stays at Selina hostels? the price is YIKES : r/digitalnomad",
        description: "Reddit discussion about Selina hostel pricing and target audience.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://skift.com/2024/07/22/selina-collapses-in-liquidity-crisis-seeks-buyers/",
        title: "Selina Collapses in Liquidity Crisis, Seeks Buyers",
        description: "News article about Selina's financial difficulties and search for buyers.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Selina CoLive specific results
  if (lowerQuery === "selina colive") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/digitalnomad/comments/1dlewoo/beware_of_the_selina_colive_program_mega_scam/",
        title: "Beware of the Selina Colive Program- Mega scam : r/digitalnomad",
        description: "Reddit warning about issues with Selina's CoLive program.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://duracatravels.com/selina-review/",
        title: "Selina Review: An Honest and Detailed Review from a Solo Female ...",
        description: "Blog review of Selina hostels, including the CoLive program.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/digitalnomad/comments/18xctcp/does_the_selina_colive_program_still_exist_anyone/",
        title: "Does the Selina Colive program still exist? Anyone opinions on it? : r ...",
        description: "Reddit discussion about the current status of Selina's CoLive program.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Selina reviews specific results
  if (lowerQuery === "selina reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/digitalnomad/comments/stqqrb/what_do_you_think_of_selina/",
        title: "What do you think of Selina? : r/digitalnomad",
        description: "Reddit discussion with reviews and opinions on Selina hostels and coworking spaces.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://duracatravels.com/selina-review/",
        title: "Selina Review: An Honest and Detailed Review from a Solo Female ...",
        description: "Detailed blog review of Selina properties from a solo female traveler's perspective.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.tripadvisor.com/Hotel_Review-g150801-d15236825-Reviews-Selina_Oaxaca-Oaxaca_Southern_Mexico.html",
        title: "SELINA OAXACA - Prices & Hotel Reviews (Mexico)",
        description: "TripAdvisor reviews of Selina's Oaxaca, Mexico location.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
