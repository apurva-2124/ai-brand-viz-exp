
import { SearchResult } from "../types";

/**
 * Get Vrbo specific search results
 */
export function getVrboResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Vrbo vs Airbnb specific results
  if (lowerQuery === "vrbo vs airbnb") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/vrbo/comments/1avoj88/vrbo_or_airbnb/",
        title: "Vrbo or Airbnb : r/vrbo",
        description: "Reddit discussion comparing Vrbo and Airbnb for vacation rentals, with user experiences and recommendations.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.nerdwallet.com/article/travel/airbnb-vs-vrbo-which-is-better-for-travelers",
        title: "Airbnb vs. Vrbo: Which Is Better for Travelers? - NerdWallet",
        description: "NerdWallet's comparison of Airbnb and Vrbo vacation rental platforms for travelers.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/TravelHacks/comments/1gwd9kz/airbnb_vs_vrbo/",
        title: "Airbnb vs vrbo : r/TravelHacks",
        description: "Travel Hacks Reddit discussion comparing Airbnb and Vrbo platforms.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Vrbo reviews specific results
  if (lowerQuery === "vrbo reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/vrbo/comments/16nrfb5/before_you_book_a_vrbo_vacation_please_read_this/",
        title: "Before you book a VRBO vacation, please read this! : r/vrbo",
        description: "Reddit post with important considerations and reviews before booking through Vrbo.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://help.vrbo.com/articles/How-do-I-submit-a-review",
        title: "Submit a property review | Help",
        description: "Vrbo Help article on how to submit a property review after your stay.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.vrbo.com/reviews",
        title: "Vrbo Reviews - Verified Guest Reviews | Vrbo",
        description: "Browse verified guest reviews of Vrbo properties and rentals.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Vacation rentals specific results
  if (lowerQuery === "vacation rentals") {
    return [
      {
        rank: 1,
        url: "https://www.vacasa.com/",
        title: "Vacasa | Vacation Rentals, Vacation Rental Management, Real Estate",
        description: "Vacasa offers vacation rentals and property management services for homeowners and travelers.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.tripadvisor.com/Rentals",
        title: "Vacation Rentals - Book Cabins, Beach Houses, Condos - Tripadvisor",
        description: "Tripadvisor's platform for booking vacation rentals, including cabins, beach houses, and condos.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.vrbo.com/",
        title: "Vrbo | Book Your Vacation Home Rentals: Beach Houses, Cabins...",
        description: "Vrbo's platform for booking vacation home rentals, beach houses, cabins, and more.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
