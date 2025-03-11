
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Clock, TrendingUp } from "lucide-react";

interface CtaSectionProps {
  onGetStarted: () => void;
}

export const CtaSection = ({ onGetStarted }: CtaSectionProps) => {
  return (
    <div className="bg-gray-50 py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Discover Your Brand's AI Visibility Score
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            AI search is evolving fast—don't get left behind. See how your brand appears in AI responses and get actionable insights to improve your visibility.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-primary/80" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free AI Visibility Scan</h3>
              <p className="text-muted-foreground">
                See if AI mentions your brand and how it describes you compared to competitors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-10 w-10 text-primary/80" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlock Deeper Insights</h3>
              <p className="text-muted-foreground">
                Upgrade for detailed competitor analysis and actionable optimization strategies.
              </p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary/90 text-lg px-8"
          >
            See How AI Describes Your Brand
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Free visibility scan takes less than 2 minutes.
          </p>
        </div>
      </Container>
    </div>
  );
};
