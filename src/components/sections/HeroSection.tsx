
import { Container } from "@/components/Container";

export const HeroSection = () => {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-primary/10 text-primary inline-block px-4 py-1 rounded-full text-sm font-medium">
          An AI Discovery Experiment
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Exploring How AI-Powered Search Perceives Brands & Industries
        </h1>
        
        <p className="text-xl text-muted-foreground">
          As a market researcher, I've spent years studying how people discover brands—first through
          traditional polling, then social listening, and now AI-powered search. This experiment is my
          way of exploring how AI models (OpenAI, Anthropic, Google) interpret brands and industries
          based on publicly available data.
        </p>
        
        <p className="text-base text-muted-foreground">
          Users can select an AI model to generate responses and must provide their own API key.
        </p>
        
        <div className="pt-4">
          <span className="inline-block animate-bounce">↓</span>
        </div>
      </div>
    </Container>
  );
};
