
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ApiSettings } from "@/components/ApiSettings";

const Navbar = () => {
  return (
    <header className="border-b py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-xl">AI Brand Visibility & Perception Explorer</span>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About the Experiment
              </a>
              <a href="#explorer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Brand Explorer
              </a>
              <a href="#journey" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Join the Journey
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ApiSettings />
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/your-repo/optimly" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
