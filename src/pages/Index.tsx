
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandTracker } from "@/components/BrandTracker";
import { useState } from "react";

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
                    <h3 className="text-xl font-semibold mb-3">Input Your Brand</h3>
                    <p className="text-muted-foreground">Enter your brand name, industry, and key search terms to monitor.</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Track AI Responses</h3>
                    <p className="text-muted-foreground">See how often and prominently your brand appears in AI search results.</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Optimize Visibility</h3>
                    <p className="text-muted-foreground">Get actionable insights to improve your brand's visibility in AI responses.</p>
                  </Card>
                </div>
                <div className="mt-12 text-center">
                  <Button size="lg" onClick={() => setShowTracker(true)}>
                    Start Tracking Now
                  </Button>
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
