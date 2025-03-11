
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="bg-accent py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Track Your Brand's Visibility in AI Search
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Monitor how your brand appears in AI platforms like ChatGPT and Claude, and get insights to improve your visibility.
          </p>
          <Button size="lg" onClick={onGetStarted}>
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};
