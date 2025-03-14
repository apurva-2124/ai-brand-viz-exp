
import { Container } from "@/components/Container";
import { ExternalLink } from "lucide-react";

export const Citations = () => {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Citations</h2>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://cmscritic.com/as-ai-generated-search-grows-otterly-is-utterly-awesome-for-marketers-heres-why" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    SearchEngineLand – How to Monitor Brand Visibility in AI Search
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rise of Generative Engine Optimization and AI search tools
                  </p>
                </div>
              </li>
              
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://sparktoro.com/blog/how-can-my-brand-appear-in-answers-from-chatgpt-perplexity-gemini-and-other-ai-llm-tools/#:~:text=The%20way%20that%20you%20rank,show%20you%20what%20I%20mean" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    SparkToro (Rand Fishkin) – How Can My Brand Appear in AI Answers?
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Importance of mentions in training data
                  </p>
                </div>
              </li>
              
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://www.searchenginejournal.com/ai-search-optimization-make-your-structured-data-accessible/537843/#:~:text=Crawlers%20like%20GPTBot%20,any%20structured%20data%20added%20later" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    SearchEngineJournal – AI Search Optimization: Structured Data
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI crawlers can miss JS-injected schema
                  </p>
                </div>
              </li>
              
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://commexis.com/blog/why-isnt-my-business-showing-up-in-chatgpt/#:~:text=1,hasn%E2%80%99t%20published%20enough%20quality%20content" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    Commexis – Why Isn't My Business Showing Up in ChatGPT?
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reasons for missing brands: training data, presence, content quality
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};
