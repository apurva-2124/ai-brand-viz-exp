
import { SearchResult } from "../types";

/**
 * Get Roman (Ro Health) specific search results
 */
export function getRomanResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Roman ED treatment specific results
  if (lowerQuery === "roman ed treatment") {
    return [
      {
        rank: 1,
        url: "https://ro.co/erectile-dysfunction/",
        title: "Erectile Dysfunction (ED) Meds & Pills Online, Delivered | Roman",
        description: "Roman offers ED medication online, prescribed by US-licensed healthcare professionals and delivered to your door in discreet packaging.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.hims.com/blog/hims-vs-roman",
        title: "Hims vs. Roman for ED 2024: How Do They Compare? | Good...",
        description: "A detailed comparison of Hims and Roman for erectile dysfunction treatment options and services.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://ro.co/pricing/",
        title: "Roman Pricing | Medication Costs for ED, PE, Hair Loss, Herpes...",
        description: "Information about Roman's pricing for various medications and treatments, including ED options.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Roman vs Hims specific results
  if (lowerQuery === "roman vs hims") {
    return [
      {
        rank: 1,
        url: "https://www.hims.com/blog/hims-vs-roman",
        title: "Hims vs. Roman for ED 2024: How Do They Compare? | Good...",
        description: "A detailed comparison of Hims and Roman for erectile dysfunction treatment options and services.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.innerbody.com/hims-vs-roman",
        title: "Hims vs. Roman | Which Telehealth Provider is Best?",
        description: "Innerbody's comprehensive comparison of Hims and Roman telehealth services for men's health.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://apnews.com/article/lifestyle-business-drug-approvals-corporate-news-sexual-and-reproductive-health-8e1d44c2534ac85cdc847c648ac5d015",
        title: "Hims vs Roman | AP News",
        description: "AP News article comparing Hims and Roman telehealth services for men's health.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Men's health online specific results
  if (lowerQuery === "men's health online") {
    return [
      {
        rank: 1,
        url: "https://www.menshealth.com/",
        title: "Men's Health - Fitness, Nutrition, Health, Sex, Style & Weight Loss...",
        description: "Men's Health magazine's online resource for fitness, nutrition, health, and lifestyle advice for men.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.everlywell.com/mens-health-online-support/",
        title: "Men's Health Virtual Visit | Online Support for Men's Health | Everlywell",
        description: "Everlywell's virtual care services for men's health issues and concerns.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.menshealth.com/uk/",
        title: "Men's Health UK",
        description: "Men's Health UK's online resource for fitness, nutrition, health, and lifestyle advice for men.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
