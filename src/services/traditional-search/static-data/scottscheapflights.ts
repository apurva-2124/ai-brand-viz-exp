
import { SearchResult } from "../types";

/**
 * Get Scott's Cheap Flights specific search results
 */
export function getScottsCheapFlightsResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Flight deals newsletter specific results
  if (lowerQuery === "flight deals newsletter") {
    return [
      {
        rank: 1,
        url: "https://www.going.com/",
        title: "Going™ | Formerly Scott's Cheap Flights | Flight Subscription",
        description: "Scott's Cheap Flights (now Going) offers flight deals and alerts to subscribers looking for affordable travel.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://jacksflightclub.com/",
        title: "Jack's Flight Club | Cheap Flights, Flight Deals & Alerts",
        description: "Jack's Flight Club's flight deal newsletter and flight alert subscription service.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.theflightdeal.com/",
        title: "The Flight Deal – \"Just because it's a great fare doesn't mean it's a ...",
        description: "The Flight Deal website offering notifications about good airfare prices.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Scott's Cheap Flights reviews specific results
  if (lowerQuery === "scott's cheap flights reviews") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/Shoestring/comments/yireec/is_scotts_cheap_flights_worth_the_membership_fee/",
        title: "Is Scott's Cheap Flights Worth the Membership Fee? : r/Shoestring",
        description: "Reddit discussion about the value of Scott's Cheap Flights membership.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.trustpilot.com/review/scottscheapflights.com",
        title: "Scott's Cheap Flights Reviews | Read Customer Service Reviews of ...",
        description: "Trustpilot reviews of Scott's Cheap Flights service and customer experiences.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/TravelHacks/comments/15ykpso/has_anyone_else_noticed_how_terrible_going/",
        title: "Has anyone else noticed how terrible \"Going\" (formerly Scott's ...",
        description: "Reddit discussion about the quality of Going (formerly Scott's Cheap Flights).",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Scott's Cheap Flights vs Kayak specific results
  if (lowerQuery === "scott's cheap flights vs kayak") {
    return [
      {
        rank: 1,
        url: "https://www.going.com/guides/google-flights-vs-kayak-how-to-use-both-to-find-cheap-flights",
        title: "Google Flights vs. Kayak: How to Use Both to Find Cheap Flights",
        description: "Going (formerly Scott's Cheap Flights) guide comparing Google Flights and Kayak.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/travel/comments/8ezu04/google_flights_vs_priceline_vs_kayak/",
        title: "Google Flights vs. Priceline vs. Kayak : r/travel",
        description: "Reddit comparison of flight search engines including Google Flights, Priceline, and Kayak.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.going.com/guides/how-to-use-kayak-to-find-cheap-flights",
        title: "How to Use Kayak to Find Cheap Flights",
        description: "Going (formerly Scott's Cheap Flights) guide on using Kayak for finding cheap flights.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
