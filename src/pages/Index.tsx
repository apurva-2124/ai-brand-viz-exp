
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResearchQuestions } from "@/components/sections/ResearchQuestions";
import { TLDRFindings } from "@/components/sections/TLDRFindings";
import { AboutExperiment } from "@/components/sections/AboutExperiment";
import { BrandExplorer } from "@/components/sections/BrandExplorer";
import { ExperimentDesignSection } from "@/components/sections/ExperimentDesignSection";
import { Citations } from "@/components/sections/Citations";
import { useEffect } from "react";
import { event } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    // Track page load
    event({
      action: 'page_view',
      category: 'engagement',
      label: 'home_page'
    });
  }, []);

  const handleSectionView = (sectionName: string) => {
    event({
      action: 'section_view',
      category: 'engagement',
      label: sectionName
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div id="research-questions" onMouseEnter={() => handleSectionView('research_questions')}>
          <ResearchQuestions />
        </div>
        <div id="tldr-findings" onMouseEnter={() => handleSectionView('tldr_findings')}>
          <TLDRFindings />
        </div>
        <div id="brand-explorer" onMouseEnter={() => handleSectionView('brand_explorer')}>
          <BrandExplorer />
        </div>
        <div id="experiment-design" onMouseEnter={() => handleSectionView('experiment_design')}>
          <ExperimentDesignSection />
        </div>
        <div id="about-experiment" onMouseEnter={() => handleSectionView('about_experiment')}>
          <AboutExperiment />
        </div>
        <div id="citations" onMouseEnter={() => handleSectionView('citations')}>
          <Citations />
        </div>
      </main>
      <footer className="py-2 bg-muted/30 text-center text-xs text-muted-foreground border-t">
        AI-generated results are for research purposes only and may not be accurate. This tool does not modify AI responses or represent any brands.
      </footer>
    </div>
  );
};

export default Index;
