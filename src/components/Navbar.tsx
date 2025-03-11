
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ApiSettings } from "@/components/ApiSettings";

const Navbar = () => {
  return (
    <header className="border-b py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Optimly</span>
            <span className="text-muted-foreground text-sm">AI Brand Visibility Report</span>
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
