
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10',
        isScrolled 
          ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo.svg" 
            alt="Optimly AI" 
            className={cn(
              'transition-all duration-300',
              isScrolled ? 'h-8 w-8' : 'h-10 w-10'
            )} 
          />
          <span 
            className={cn(
              'font-medium transition-all duration-300',
              isScrolled ? 'text-lg' : 'text-xl'
            )}
          >
            Optimly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Competitors
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Recommendations
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Reports
          </Link>
          <Button size="sm" className="ml-4">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40 p-6 flex flex-col space-y-6 animate-fade-in-up">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Competitors
          </Link>
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Recommendations
          </Link>
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reports
          </Link>
          <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
