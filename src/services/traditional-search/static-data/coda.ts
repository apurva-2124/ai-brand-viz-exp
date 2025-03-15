
import { SearchResult } from "../types";

/**
 * Get Coda specific search results
 */
export function getCodaResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Coda app specific results
  if (lowerQuery === "coda app") {
    return [
      {
        rank: 1,
        url: "https://coda.io/",
        title: "Coda: Your all-in-one collaborative workspace.",
        description: "Coda is a new doc that brings words, data, and teams together. It's a new type of document that combines the flexibility of docs, the power of spreadsheets, and the usability of apps.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/codaio/comments/1bftq2y/is_coda_just_a_gimmick/",
        title: "Is CODA Just a Gimmick? : r/codaio",
        description: "Reddit discussion about Coda and its usefulness for various applications.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://community.coda.io/t/desktop-applications/22458",
        title: "Desktop Applications - Suggestion Box - Coda Maker Community",
        description: "Community discussion about desktop applications for Coda.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Coda vs Notion specific results
  if (lowerQuery === "coda vs notion") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/Notion/comments/12w6jdz/notion_vs_coda_2023/",
        title: "Notion vs Coda 2023 : r/Notion",
        description: "Reddit discussion comparing Notion and Coda in 2023, with user experiences and preferences.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://community.coda.io/t/coda-vs-notion/40623",
        title: "Coda vs Notion? - Coda Maker Community",
        description: "Community discussion on the differences between Coda and Notion for various use cases.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/Notion/comments/v5xt6d/notion_vs_coda_what_are_your_thoughts/",
        title: "Notion vs Coda... what are your thoughts? : r/Notion",
        description: "User experiences and thoughts on Notion vs Coda for various workflows.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Coda templates specific results
  if (lowerQuery === "coda templates") {
    return [
      {
        rank: 1,
        url: "https://coda.io/gallery",
        title: "Gallery | explore Coda docs, templates, and Packs - Coda",
        description: "Browse Coda's gallery of templates, docs, and Packs to get started quickly on your projects.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.reddit.com/r/codaio/comments/17dta9c/where_are_all_the_templates/",
        title: "Where are all the templates? : r/codaio",
        description: "Reddit discussion about finding and using templates in Coda.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://community.coda.io/t/free-coda-ai-templates/40259",
        title: "FREE Coda AI templates - Coda Maker Community",
        description: "Community post sharing free AI templates for Coda.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
