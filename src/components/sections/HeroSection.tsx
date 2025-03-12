
import { Container } from "@/components/Container";

export const HeroSection = () => {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-primary/10 text-primary inline-block px-4 py-1 rounded-full text-sm font-medium">
          An AI Discovery Experiment
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          How AI Search is Reshaping Brand Discovery & Perception
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Traditional search is being replaced by AI assistants that don't just rank web pages—they 
          generate answers in real time. This experiment explores how AI models (OpenAI, Anthropic, Google) 
          describe brands differently, influencing what people learn and what gets left out. By comparing 
          their responses, we can better understand the shift from keyword-based search to AI-driven discovery.
        </p>
        
        <p className="text-base text-muted-foreground">
          Try it out by selecting an AI model and seeing how it interprets brand narratives based on 
          publicly available data.
        </p>
        
        <div className="pt-4">
          <span className="inline-block animate-bounce">↓</span>
        </div>
      </div>
    </Container>
  );
};
