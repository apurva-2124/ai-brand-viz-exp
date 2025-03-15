
import { SearchResult } from "../types";

/**
 * Get Marriott Bonvoy specific search results
 */
export function getMarriottResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Marriott rewards program specific results
  if (lowerQuery === "marriott rewards program") {
    return [
      {
        rank: 1,
        url: "https://www.marriott.com/loyalty.mi",
        title: "Discover Marriott Bonvoy | Join The Best Hotel Rewards Program",
        description: "Learn about Marriott Bonvoy, the hotel rewards program that lets you earn and redeem points at hotels and resorts worldwide.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.travelagents.marriott.com/travelagents/default.mi",
        title: "Marriott's Travel Agents",
        description: "Information for travel agents about Marriott's programs and benefits.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.marriott.com/loyalty/member-benefits.mi",
        title: "Membership Levels & Benefits | Earn & Redeem Points | Marriott...",
        description: "Detailed information about Marriott Bonvoy membership levels, benefits, and ways to earn and redeem points.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Marriott Bonvoy credit card specific results
  if (lowerQuery === "marriott bonvoy credit card") {
    return [
      {
        rank: 1,
        url: "https://www.marriott.com/credit-cards.mi",
        title: "Marriott Bonvoy Credit Cards | Earn Points & Free Nights",
        description: "Explore Marriott Bonvoy credit cards that let you earn points and free nights at hotels and resorts worldwide.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy",
        title: "Marriott Bonvoy | Credit Cards | Chase.com",
        description: "Chase's Marriott Bonvoy credit cards with benefits, rewards, and perks for hotel stays.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/",
        title: "Marriott Bonvoy Brilliant™ American Express® Card | American...",
        description: "American Express's Marriott Bonvoy Brilliant credit card with premium benefits and rewards.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Marriott Bonvoy login specific results
  if (lowerQuery === "marriott bonvoy login") {
    return [
      {
        rank: 1,
        url: "https://www.marriott.com/en-gb/sign-in.mi",
        title: "Welcome to Marriott Bonvoy",
        description: "Sign in to your Marriott Bonvoy account to access your profile, points, and reservations.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://help.marriott.com/s/article/Article-22182",
        title: "How Do I Login to My Marriott Bonvoy® Account?",
        description: "Help article on logging in to your Marriott Bonvoy account and troubleshooting login issues.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.marriott.com/loyalty/redeem/purchasePoints.mi",
        title: "Sign In",
        description: "Sign in to your Marriott Bonvoy account to purchase points or access your benefits.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
