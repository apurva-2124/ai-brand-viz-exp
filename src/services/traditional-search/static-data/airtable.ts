
import { SearchResult } from "../types";

/**
 * Get Airtable specific search results
 */
export function getAirtableResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Airtable templates specific results
  if (lowerQuery === "airtable templates") {
    return [
      {
        rank: 1,
        url: "https://www.airtable.com/templates",
        title: "Templates - Airtable",
        description: "Browse Airtable's template gallery to find the perfect starting point for your next project.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://community.airtable.com/t5/base-design/best-to-do-list-template-and-recommendations/td-p/157077",
        title: "Best to-do list template and recommendations | Airtable Community",
        description: "Community discussion about the best Airtable templates for to-do lists and task management.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.airtable.com/templates/featured",
        title: "Templates",
        description: "Featured templates from Airtable to help you get started with your projects quickly.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Airtable vs Notion specific results
  if (lowerQuery === "airtable vs notion") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/Airtable/comments/z3tzn3/notion_vs_airtable_once_more/",
        title: "Notion vs airtable - once more .... : r/Airtable",
        description: "Reddit discussion comparing Airtable and Notion for various use cases and workflows.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://zapier.com/blog/airtable-vs-notion/",
        title: "Airtable vs. Notion: Which app do you need? | Zapier",
        description: "A detailed comparison of Airtable and Notion, helping you decide which tool is right for your needs.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/Airtable/comments/17aesq3/initial_thoughts_on_notion_vs_airtable_for_a/",
        title: "Initial thoughts on Notion vs Airtable for a fairly large directory : r/Airtable",
        description: "User experience and comparison of Notion vs Airtable for managing large directories of information.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Best project management tools specific results
  if (lowerQuery === "best project management tools") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/projectmanagement/comments/1b0lfvi/what_is_the_best_free_project_management_tool/",
        title: "What is the best free project management tool, specifically geared...",
        description: "Reddit discussion on free project management tools and their features.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.wrike.com/project-management-guide/faq/what-are-project-management-tools/",
        title: "Top 21 project management tools: 2025 guide",
        description: "Comprehensive guide to the best project management tools available today.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/projectmanagement/comments/11pifio/looking_for_the_right_pm_toolsapps/",
        title: "Looking for the right PM tools/apps : r/projectmanagement",
        description: "Discussion about finding the right project management tools for different needs.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
