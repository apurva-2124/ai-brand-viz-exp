
import { Container } from "@/components/Container";
import { Check, X } from "lucide-react";

export const ComparisonTable = () => {
  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why AI Search Optimization Matters
          </h2>
          
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {/* Table Headers */}
            <div className="grid grid-cols-2">
              <div className="bg-gray-100 p-6 text-center border-r border-gray-200">
                <h3 className="text-xl font-semibold">Traditional SEO</h3>
                <p className="text-sm text-muted-foreground">(Google Search)</p>
              </div>
              <div className="bg-primary/10 p-6 text-center">
                <h3 className="text-xl font-semibold text-primary">AI Discovery</h3>
                <p className="text-sm text-muted-foreground">(Optimly AI)</p>
              </div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y">
              {/* Row 1 */}
              <div className="grid grid-cols-2 divide-x">
                <div className="p-4 sm:p-6">
                  <p className="font-medium">Ranks your website in a list of links</p>
                </div>
                <div className="p-4 sm:p-6 bg-primary/5">
                  <p className="font-medium">Mentions your brand directly in AI-generated answers</p>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-2 divide-x">
                <div className="p-4 sm:p-6">
                  <p className="font-medium">Focuses on keywords and backlinks</p>
                </div>
                <div className="p-4 sm:p-6 bg-primary/5">
                  <p className="font-medium">Focuses on brand authority and contextual relevance</p>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid grid-cols-2 divide-x">
                <div className="p-4 sm:p-6 flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="font-medium">No direct comparisons to competitors</p>
                </div>
                <div className="p-4 sm:p-6 bg-primary/5 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <p className="font-medium">Shows how AI positions you vs. competitors</p>
                </div>
              </div>
              
              {/* Row 4 */}
              <div className="grid grid-cols-2 divide-x">
                <div className="p-4 sm:p-6 flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="font-medium">Users must click to see your content</p>
                </div>
                <div className="p-4 sm:p-6 bg-primary/5 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <p className="font-medium">Your brand message is delivered directly in answers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
