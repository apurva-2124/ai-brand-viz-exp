
import { Container } from "@/components/Container";

export const HeroSection = () => {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-primary/10 text-primary inline-block px-4 py-1 rounded-full text-sm font-medium">
          An AI Discovery Experiment
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          How AI-Powered Search is Changing Brand Visibility & Perception
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Brand discovery isn't what it used to be. Instead of scrolling through pages of search results, 
          people are turning to AI-powered assistants that summarize, recommend, and shape brand perceptions 
          in real time. This experiment explores how different AI models (OpenAI, Anthropic, Google) describe 
          brands across industries. By comparing their responses, we can see firsthand how AI-driven search 
          is influencing what people learn about brands—and what gets left out.
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
