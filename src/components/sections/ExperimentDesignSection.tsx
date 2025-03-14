
import { useState } from "react";
import { Container } from "@/components/Container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp } from "lucide-react";

export const ExperimentDesignSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-left">Experiment Design and AI Search Query Logic</h2>
          <div className="text-muted-foreground text-left">
            <p>
              Search engines like Google and AI-powered models like ChatGPT interpret queries differently. 
              Traditional search engines rank existing web pages based on SEO and authority, while AI 
              generates synthetic responses by summarizing patterns from vast datasets.
            </p>
            <p className="mt-3">
              To highlight these differences, we use structured Query Types that transform simple keywords 
              into more natural, AI-friendly questions.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4" defaultValue="traditional-vs-ai">
          <AccordionItem value="traditional-vs-ai">
            <Collapsible 
              open={isOpen} 
              onOpenChange={setIsOpen}
              className="border-b pb-4"
            >
              <div className="flex items-center justify-between">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  Traditional Search vs. AI Search Queries
                </AccordionTrigger>
                <CollapsibleTrigger asChild>
                  <button className="rounded-full p-1 hover:bg-muted/50">
                    <ChevronUp className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`} />
                  </button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="space-y-6 pt-4">
                <div>
                  <h4 className="font-semibold mb-2">Traditional Search: Keyword-Based Queries</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Search engines rely on short keyword phrases to rank existing pages.</li>
                    <li>Users type queries like:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>"Best electric truck"</li>
                        <li>"Tesla vs. Rivian comparison"</li>
                        <li>"Airbnb complaints 2024"</li>
                      </ul>
                    </li>
                    <li>Google then ranks web pages with relevant content (blog posts, reviews, news articles).</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Search: Conversational Queries</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI models work best when queries are phrased as natural language questions.</li>
                    <li>Instead of short keywords, AI responds to full-sentence prompts like:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>"What are common problems with electric trucks from Rivian?"</li>
                        <li>"How does Tesla compare to Rivian in the automotive industry?"</li>
                        <li>"Tell me about short-term rentals in the hospitality sector."</li>
                      </ul>
                    </li>
                    <li>AI generates custom responses based on patterns in text it has processed.</li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </AccordionItem>

          <AccordionItem value="why-ai-query-types">
            <AccordionTrigger className="text-xl font-semibold">
              Why We Use AI-Specific Query Types
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-4">
              <p>To accurately compare AI vs. traditional search, we structure query types to reflect how AI best understands intent. Here's how each category works:</p>
              
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="general-query">
                  <AccordionTrigger>General Query (Baseline)</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google:</strong> Shows ranked informational pages (Wikipedia, news, blogs).</li>
                      <li><strong>AI:</strong> Summarizes general knowledge on the topic.</li>
                      <li><strong>Example:</strong>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Google Search Query: "Short-term rentals hospitality industry"</li>
                          <li>AI Query: "Tell me about short-term rentals in the Travel & Hospitality sector."</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="comparison-query">
                  <AccordionTrigger>Comparison Query</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google:</strong> Shows articles comparing brands (e.g., "Best travel sites ranked").</li>
                      <li><strong>AI:</strong> Synthesizes key differences into a conversational response.</li>
                      <li><strong>Example:</strong>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Google Search Query: "Airbnb vs. Vrbo"</li>
                          <li>AI Query: "How does Airbnb compare to its competitors in the Travel & Hospitality sector?"</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="negative-sentiment">
                  <AccordionTrigger>Negative Sentiment Query (Reputation Risk)</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google:</strong> Often surfaces PR-managed content or forum discussions.</li>
                      <li><strong>AI:</strong> Pulls from public complaints, sentiment trends, and pain points.</li>
                      <li><strong>Example:</strong>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Google Search Query: "Airbnb complaints 2024"</li>
                          <li>AI Query: "What are common problems with Airbnb rentals in Travel & Hospitality?"</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="review-based">
                  <AccordionTrigger>Review-Based Query</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google:</strong> Prioritizes review sites (Yelp, Trustpilot, Reddit).</li>
                      <li><strong>AI:</strong> Aggregates opinions from multiple sources into a summary.</li>
                      <li><strong>Example:</strong>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Google Search Query: "Best beauty products reviews"</li>
                          <li>AI Query: "What do customers say about Sephora and its beauty products in the Consumer Goods sector?"</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-assistant">
                  <AccordionTrigger>AI Assistant Query (Conversational Search)</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google:</strong> Suggests related searches or FAQ pages.</li>
                      <li><strong>AI:</strong> Responds like a virtual assistant, providing recommendations.</li>
                      <li><strong>Example:</strong>
                        <ul className="list-disc pl-6 mt-1">
                          <li>Google Search Query: "Buy meditation app Calm discount"</li>
                          <li>AI Query: "If I were looking for a meditation app from Calm, how would you assist me?"</li>
                        </ul>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="implications">
            <AccordionTrigger className="text-xl font-semibold">
              What This Means for Brands
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>AI does not just rank pages—it creates new answers, making brand representation less predictable.</li>
                <li>AI-generated results may surface risks, such as negative sentiment or misinterpretations.</li>
                <li>Understanding how AI transforms search intent helps brands optimize visibility in AI-driven platforms.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Container>
  );
};
