
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { ApiSettings } from './ApiSettings';
import { Github } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full shadow-sm border-b py-3">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-7 w-auto" />
              <span className="ml-2 text-xl font-semibold">AI Brand Visibility & Perception Explorer</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="#about-experiment" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About the Experiment
            </a>
            <a 
              href="#brand-explorer" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Brand Explorer
            </a>
            <div className="flex items-center space-x-2">
              <ApiSettings />
              <a 
                href="https://github.com/yourusername/ai-brand-visibility" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
