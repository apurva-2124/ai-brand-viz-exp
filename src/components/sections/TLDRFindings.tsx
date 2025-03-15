
import { Container } from "@/components/Container";
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export const TLDRFindings = () => {
  return (
    <Container className="py-16 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">TL;DR Findings</h2>
        
        <div className="space-y-6">
          <p className="text-lg">
            AI search doesn't use the same ranking signals as traditional SEO. 
            For brands that rely on SEO & paid search for discovery, AI-generated responses may not surface them the same way Google rankings do.
          </p>
          
          <div>
            <p className="mb-2 flex items-start gap-2">
              <span className="text-primary"><ArrowRight className="h-5 w-5 flex-shrink-0 mt-0.5" /></span>
              <span>Examples of brands that lost visibility in AI search despite ranking high on Google:</span>
            </p>
            <ul className="list-disc pl-10 space-y-2">
              <li><strong>Airtable</strong>: Ranks well in Google for productivity and database tool searches, but AI responses typically mention it as a secondary option after more prominent names like Notion or Monday.com.</li>
              <li><strong>Vrbo</strong>: Has strong Google search rankings for vacation rentals (often appearing in top 3 results), but is frequently overshadowed by Airbnb in AI responses, leading to lower AI visibility.</li>
              <li><strong>Scott's Cheap Flights</strong>: Has strong Google rankings for flight deals searches but moderate AI visibility, as AI mentions it along competitor newsletters and doesn't recommend it directly.</li>
            </ul>
          </div>
          
          <p className="text-lg mt-8">
            Even brands that appear in AI search may not be explicitly recommended in AI search. Instead of clear endorsements, AI often presents them alongside competitors in an undifferentiated way or with negative sentiment.
          </p>
          
          <div>
            <p className="mb-2 flex items-start gap-2">
              <span className="text-primary"><ArrowRight className="h-5 w-5 flex-shrink-0 mt-0.5" /></span>
              <span>Examples of brands that appear in AI search but may not be recommended or positioned in an ideal way:</span>
            </p>
            <ul className="list-disc pl-10 space-y-2">
              <li><strong>Roman (Ro Health)</strong>: Has high visibility in AI responses but is often presented as one option among many without explicit recommendation, especially when compared to competitors like Hims.</li>
              <li><strong>Turo</strong>: Appears in AI search but often with cautionary notes about potential issues compared to traditional rental agencies.</li>
            </ul>
          </div>
          
          {/* Collapsible sections */}
          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="why-this-matters" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <h3 className="text-xl font-medium text-left">Why This Matters</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="space-y-2">
                  <li><strong>Key Risk:</strong> If AI doesn't explicitly recommend a brand, it may be omitted, misrepresented, or mentioned without clear context.</li>
                  <li><strong>Key Opportunity:</strong> Brands that adapt early can shape AI-generated content to secure recommendations where it matters most.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="explore" className="border rounded-lg mt-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <h3 className="text-xl font-medium text-left">Explore How Brands Appear in AI Search</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="mb-2">Want to see how AI search presents brands compared to traditional search rankings?</p>
                <p className="mb-2 font-medium flex items-center">
                  <span className="mr-2">🔍</span> <a href="#brand-explorer">Try it in the Brand Explorer</a>
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-1">
                  <li>Select your industry & brand</li>
                  <li>Select traditional search keywords to compare with</li>
                  <li>Compare AI-generated responses with Google search rankings</li>
                </ul>
                <p>Note if the brand is missing, misrepresented, or not being explicitly recommended.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="next" className="border rounded-lg mt-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <h3 className="text-xl font-medium text-left">What's Next?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="mb-4">Understanding how AI search perceives and presents your brand is just the beginning.</p>
                <p className="mb-2">Next, we'll explore:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>How brands can influence AI models to improve visibility & positioning.</li>
                  <li>What structured data signals increase AI-generated recommendations.</li>
                  <li>Tactical strategies for securing brand presence in AI-driven search.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Container>
  );
};
