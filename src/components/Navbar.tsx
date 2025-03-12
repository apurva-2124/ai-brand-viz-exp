
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Container from './Container';
import { ApiSettings } from './ApiSettings';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full shadow-sm border-b py-3">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-7 w-auto" />
              <span className="ml-2 text-xl font-semibold">AI Brand Visibility</span>
            </Link>
            <div className="hidden sm:flex items-center ml-8 space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/optimize" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/optimize' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Optimization
              </Link>
              <Link 
                to="/search" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/search' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Search
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ApiSettings />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
