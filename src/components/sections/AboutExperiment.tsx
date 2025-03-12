
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export const AboutExperiment = () => {
  return (
    <Container className="py-16" id="about-experiment">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">About This Experiment</h2>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            As a product marketer and researcher, I've spent years studying how people discover and 
            perceive brands—first through traditional polling, then social listening, and now AI-powered 
            search. As AI assistants like ChatGPT, Gemini, and Claude reshape how consumers learn about 
            companies and their products, I got curious: What exactly do these models say about brands? 
            How do AI-generated results differ across models? And what patterns emerge over time?
          </p>
          
          <p>
            What started as a curiosity—tracking AI-generated search results—quickly turned into a deeper 
            exploration of how AI search influences brand perception. This project documents how AI-generated 
            responses differ from traditional search, shaping the way consumers discover brands.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4 pt-8">
          <Button variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            Visit GitHub Repository
          </Button>
          
          <div className="text-sm text-center">
            <p>© 2025 AI Brand Perception Explorer</p>
            <p>
              Created by{" "}
              <a href="https://x.com/ApurvaLuty" className="text-primary hover:underline">
                Apurva Luty
              </a>
              {" "}—{" "}
              <a href="https://x.com/ApurvaLuty" className="text-primary hover:underline">
                Follow along on X
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
