
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResearchQuestions } from "@/components/sections/ResearchQuestions";
import { AboutExperiment } from "@/components/sections/AboutExperiment";
import { BrandExplorer } from "@/components/sections/BrandExplorer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ResearchQuestions />
        <BrandExplorer />
        <AboutExperiment />
      </main>
    </div>
  );
};

export default Index;
