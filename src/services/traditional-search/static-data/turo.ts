
import { SearchResult } from "../types";

/**
 * Get Turo specific search results
 */
export function getTuroResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Car rental alternatives specific results
  if (lowerQuery === "car rental alternatives") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/Shoestring/comments/3rzyye/are_there_any_cheap_optionsalternatives_to_rent_a/",
        title: "Are there any cheap options/alternatives to rent a car for a month or ...",
        description: "Reddit discussion about alternatives to traditional car rentals for longer periods.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.nerdwallet.com/article/travel/rental-car-alternatives",
        title: "3 Smart Rental Car Alternatives To Consider Booking - NerdWallet",
        description: "NerdWallet's guide to car rental alternatives and peer-to-peer car sharing services.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/turo/comments/nrfbn5/turo_alternative/",
        title: "Turo Alternative? : r/turo",
        description: "Reddit discussion about alternatives to the Turo car sharing platform.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Turo reviews specific results
  if (lowerQuery === "turo reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/turo/comments/13sowzz/would_you_recommend_turo_looking_to_rent_a_car/",
        title: "Would you recommend turo? Looking to rent a car with my fiancé for ...",
        description: "Reddit discussion with reviews and recommendations about using Turo.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.tripadvisor.com/ShowTopic-g1-i12567-k14443524-My_review_of_TURO_the_airbnb_car_rental_company-Road_Trips.html",
        title: "My review of TURO (the \"airbnb' car rental company) - Road Trips ...",
        description: "TripAdvisor user review of Turo's car rental service and experience.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/turo/comments/svdevw/do_not_use_turo/",
        title: "Do Not Use Turo : r/turo",
        description: "Negative review and warning about using Turo's car rental service.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Turo vs Enterprise specific results
  if (lowerQuery === "turo vs enterprise") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/turo/comments/mu7qe7/turo_or_typical_car_rental_hertzenterprise/",
        title: "Turo or typical car rental (Hertz/Enterprise) : r/turo",
        description: "Reddit comparison between Turo and traditional rental companies like Hertz and Enterprise.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.tripadvisor.com/ShowTopic-g143057-i1449-k14663915-Turo_car_rental_vs_enterprise-Zion_National_Park_Utah.html",
        title: "Turo car rental vs enterprise - Zion National Park Forum - Tripadvisor",
        description: "TripAdvisor forum discussion comparing Turo and Enterprise for Zion National Park travel.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/turo/comments/16uu9d3/why_people_choose_turo_over_big_corporates/",
        title: "Why people choose turo over big corporates : r/turo",
        description: "Reddit discussion about why people prefer Turo over major rental car companies.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
