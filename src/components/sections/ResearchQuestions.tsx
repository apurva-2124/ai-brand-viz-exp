
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
              How do different AI models vary in their interpretation of the same brand?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">2</span>
            <p className="text-xl">
              What patterns emerge across different industries and AI providers?
            </p>
          </div>
          
          <div className="flex gap-4">
            <span className="text-2xl text-primary/50">3</span>
            <p className="text-xl">
              How do AI interpretations compare to human brand associations?
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
