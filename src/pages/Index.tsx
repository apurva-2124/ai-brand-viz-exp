import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandTracker } from "@/components/BrandTracker";
import { useState } from "react";
import { Zap, Eye, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {!showTracker ? (
          <>
            <Hero 
              onGetStarted={() => setShowTracker(true)}
            />
            <Container>
              <section className="py-20">
                <h2 className="text-3xl font-bold text-center mb-12">How AI Visibility Tracking Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      Input Your Brand
                    </h3>
                    <p className="text-muted-foreground">Enter your brand name, industry, and key search terms to monitor.</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-500" />
                      Track AI Responses
                    </h3>
                    <p className="text-muted-foreground">See how often and prominently your brand appears in AI search results.</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      Optimize Visibility
                    </h3>
                    <p className="text-muted-foreground">Get actionable insights to improve your brand's visibility in AI responses.</p>
                  </Card>
                </div>
                <div className="mt-12 text-center space-y-4">
                  <Button size="lg" onClick={() => setShowTracker(true)}>
                    Check Your AI Brand Visibility Score
                  </Button>
                  <div>
                    <Link to="/optimize" className="inline-block">
                      <Button variant="link" className="text-primary">
                        Learn about our AI Brand Visibility Optimization Services →
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </Container>
          </>
        ) : (
          <BrandTracker />
        )}
      </main>
    </div>
  );
};

export default Index;
