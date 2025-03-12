
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResearchQuestions } from "@/components/sections/ResearchQuestions";
import { AboutExperiment } from "@/components/sections/AboutExperiment";
import { BrandExplorer } from "@/components/sections/BrandExplorer";
import { ExperimentDesignSection } from "@/components/sections/ExperimentDesignSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ResearchQuestions />
        <div id="brand-explorer">
          <BrandExplorer />
        </div>
        <ExperimentDesignSection />
        <div id="about-experiment">
          <AboutExperiment />
        </div>
      </main>
      <footer className="py-2 bg-muted/30 text-center text-xs text-muted-foreground border-t">
        AI-generated results are for research purposes only and may not be accurate. This tool does not modify AI responses or represent any brands.
      </footer>
    </div>
  );
};

export default Index;
