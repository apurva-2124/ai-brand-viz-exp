
import { SearchResult } from "../types";

/**
 * Get Monday.com specific search results
 */
export function getMondayResults(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Monday.com pricing specific results
  if (lowerQuery === "monday.com pricing") {
    return [
      {
        rank: 1,
        url: "https://monday.com/pricing",
        title: "monday.com pricing and plans",
        description: "Find the right monday.com plan for your team. Compare features, pricing, and get started with a free trial.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://support.monday.com/hc/en-us/sections/360000129699-Pricing",
        title: "Pricing – Support",
        description: "Support articles about monday.com pricing, plans, and billing information.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://monday.com/blog/product/how-much-does-monday-com-cost/",
        title: "How Much Does monday.com Cost? monday.com Pricing Plans",
        description: "Detailed information about monday.com pricing plans and what features are included in each tier.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Monday.com vs Asana specific results
  if (lowerQuery === "monday.com vs asana") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/projectmanagement/comments/174v9yp/asana_vs_monday/",
        title: "Asana vs. Monday : r/projectmanagement",
        description: "Reddit discussion comparing Asana and Monday.com for project management.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://www.forbes.com/advisor/business/monday-vs-asana/",
        title: "Monday.com vs. Asana (2025 Comparison) – Forbes Advisor",
        description: "Forbes Advisor compares Monday.com and Asana to help you choose the right project management tool.",
        hasBrandMention: true,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://asana.com/compare/asana-vs-monday-com",
        title: "Asana vs. Monday.com - See Monday Alternatives • Asana",
        description: "Asana's comparison of their platform against Monday.com, highlighting key differences and features.",
        hasBrandMention: true,
        resultType: "organic"
      }
    ];
  }
  
  // Project management software specific results
  if (lowerQuery === "project management software") {
    return [
      {
        rank: 1,
        url: "https://www.reddit.com/r/projectmanagement/comments/1ajsu6v/small_company_10_employees_needing_basic_project/",
        title: "Small company (10 employees) needing basic project management...",
        description: "Reddit discussion about project management software options for small businesses.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 2,
        url: "https://thedigitalprojectmanager.com/tools/best-project-management-software/",
        title: "25 Best Project Management Software Picked For 2025",
        description: "The Digital Project Manager's guide to the best project management software available today.",
        hasBrandMention: false,
        resultType: "organic"
      },
      {
        rank: 3,
        url: "https://www.reddit.com/r/projectmanagement/comments/1b0lfvi/what_is_the_best_free_project_management_tool/",
        title: "What is the best free project management tool, specifically geared...",
        description: "Discussion about free project management tools and their features.",
        hasBrandMention: false,
        resultType: "organic"
      }
    ];
  }
  
  // Return empty array if no specific match found
  return [];
}
