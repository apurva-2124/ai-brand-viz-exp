
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
              How do AI models construct brand narratives, and where do these interpretations diverge?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">2</span>
            <p className="text-xl">
              What factors influence AI-generated brand perceptions across industries and AI models?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">3</span>
            <p className="text-xl">
              How do AI-generated brand results compare to traditional search rankings in visibility, sentiment, and accuracy?
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
