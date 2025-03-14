
import { Container } from "@/components/Container";

export const ResearchQuestions = () => {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Research Questions</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">1</span>
            <p className="text-xl">
              Does AI search favor certain types of content or brands?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">2</span>
            <p className="text-xl">
              How does brand visibility differ between traditional search engines vs. AI-generated answers?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">3</span>
            <p className="text-xl">
              What structured data signals improve AI-driven mentions?
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
