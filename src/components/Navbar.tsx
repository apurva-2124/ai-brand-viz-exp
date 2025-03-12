
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ApiSettings } from "@/components/ApiSettings";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`py-4 sticky top-0 z-50 bg-background transition-all duration-200 ${scrolled ? "border-b shadow-md" : "border-b"}`}>
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl leading-tight">AI Brand Visibility &<br className="sm:hidden" /> Perception Explorer</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about-experiment" className="text-muted-foreground hover:text-foreground transition-colors">
              About the Experiment
            </a>
            <a href="#explorer" className="text-muted-foreground hover:text-foreground transition-colors">
              Brand Explorer
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <ApiSettings />
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/your-repo/optimly" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
