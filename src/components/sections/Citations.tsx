
import { Container } from "@/components/Container";
import { ExternalLink } from "lucide-react";

export const Citations = () => {
  return (
    <Container className="py-16 border-t">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Citations & Sources</h2>
        
        <ul className="space-y-6">
          <li className="border-b pb-4">
            <a 
              href="https://cmscritic.com/as-ai-generated-search-grows-otterly-is-utterly-awesome-for-marketers-heres-why"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary flex items-start"
            >
              SearchEngineLand – How to Monitor Brand Visibility in AI Search
              <ExternalLink className="h-4 w-4 ml-1 mt-1.5" />
            </a>
            <p className="text-muted-foreground mt-1">
              Rise of Generative Engine Optimization and AI search tools
            </p>
          </li>
          
          <li className="border-b pb-4">
            <a 
              href="https://sparktoro.com/blog/how-can-my-brand-appear-in-answers-from-chatgpt-perplexity-gemini-and-other-ai-llm-tools/#:~:text=The%20way%20that%20you%20rank,show%20you%20what%20I%20mean"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary flex items-start"
            >
              SparkToro (Rand Fishkin) – How Can My Brand Appear in AI Answers?
              <ExternalLink className="h-4 w-4 ml-1 mt-1.5" />
            </a>
            <p className="text-muted-foreground mt-1">
              Importance of mentions in training data
            </p>
          </li>
          
          <li className="border-b pb-4">
            <a 
              href="https://www.searchenginejournal.com/ai-search-optimization-make-your-structured-data-accessible/537843/#:~:text=Crawlers%20like%20GPTBot%20,any%20structured%20data%20added%20later"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary flex items-start"
            >
              SearchEngineJournal – AI Search Optimization: Structured Data
              <ExternalLink className="h-4 w-4 ml-1 mt-1.5" />
            </a>
            <p className="text-muted-foreground mt-1">
              AI crawlers can miss JS-injected schema
            </p>
          </li>
          
          <li>
            <a 
              href="https://commexis.com/blog/why-isnt-my-business-showing-up-in-chatgpt/#:~:text=1,hasn%E2%80%99t%20published%20enough%20quality%20content"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary flex items-start"
            >
              Commexis – Why Isn't My Business Showing Up in ChatGPT?
              <ExternalLink className="h-4 w-4 ml-1 mt-1.5" />
            </a>
            <p className="text-muted-foreground mt-1">
              Reasons for missing brands: training data, presence, content quality
            </p>
          </li>
        </ul>
      </div>
    </Container>
  );
};
