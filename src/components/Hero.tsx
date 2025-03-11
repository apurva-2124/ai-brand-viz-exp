
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Link } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="bg-accent py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            AI Search Is Replacing Traditional SEO
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Google SEO tracks your rankings. Optimly AI tracks your visibility in ChatGPT, Gemini, and Perplexity.
          </p>
          <p className="text-xl font-medium mb-8 text-primary">
            If AI can't find you, customers can't either.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={onGetStarted} className="bg-primary hover:bg-primary/90">
              Try the AI Visibility Audit
            </Button>
            <Link to="/optimize">
              <Button size="lg" variant="outline">
                Optimize for AI Search
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
