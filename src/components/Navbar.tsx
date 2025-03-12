
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ApiSettings } from "@/components/ApiSettings";
import { Github, ExternalLink } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl leading-tight">AI Brand Visibility &<br className="sm:hidden" /> Perception Explorer</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About the Experiment
            </a>
            <a href="#explorer" className="text-muted-foreground hover:text-foreground transition-colors">
              Brand Explorer
            </a>
            <a href="#journey" className="text-muted-foreground hover:text-foreground transition-colors">
              Join the Journey
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
