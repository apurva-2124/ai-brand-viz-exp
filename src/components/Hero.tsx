
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, BarChart3, BarChart2, Search, TrendingUp } from 'lucide-react';
import { BlurCard } from './ui/blur-card';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 0) {
        const translateY = scrollPosition * 0.3;
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      } else {
        heroRef.current.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const staggeredDelay = (index: number) => ({
    animationDelay: `${index * 0.1 + 0.2}s`
  });

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 pb-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-24 top-1/3 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div 
            className={cn(
              "inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0 transition-all",
              isVisible && "opacity-100"
            )}
            style={staggeredDelay(0)}
          >
            Introducing Optimly AI
          </div>
          
          <h1 
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 opacity-0 transition-all",
              isVisible && "opacity-100"
            )}
            style={staggeredDelay(1)}
          >
            <span className="text-gradient">AI-Driven</span> Brand Visibility <br /> and Risk Assessment
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 transition-all",
              isVisible && "opacity-100"
            )}
            style={staggeredDelay(2)}
          >
            Track your brand's visibility across AI platforms, analyze competitors, 
            and assess financial risks with our powerful analytics dashboard.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 transition-all",
              isVisible && "opacity-100"
            )}
            style={staggeredDelay(3)}
          >
            <Button size="lg" className="group relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-primary/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Button>
            
            <Button size="lg" variant="outline" className="group">
              <span>View Demo</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div 
          className={cn(
            "relative max-w-5xl mx-auto opacity-0 transition-all",
            isVisible && "opacity-100"
          )}
          style={staggeredDelay(4)}
        >
          <BlurCard className="overflow-hidden p-6 md:p-8">
            <div className="flex flex-col space-y-6">
              {/* Mock Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BlurCard className="p-4 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Brand Visibility Score</span>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <LineChart className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">87/100</div>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+12% from last month</span>
                  </div>
                </BlurCard>
                
                <BlurCard className="p-4 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Spend at Risk</span>
                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-destructive" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">$12,450</div>
                  <div className="flex items-center text-xs text-red-500">
                    <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                    <span>+8% from last month</span>
                  </div>
                </BlurCard>
                
                <BlurCard className="p-4 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Competitor Mentions</span>
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <BarChart2 className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">248</div>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+18% from last month</span>
                  </div>
                </BlurCard>
              </div>
              
              {/* Mock Chart */}
              <div className="h-64 bg-secondary rounded-xl relative overflow-hidden">
                <div className="absolute top-4 left-4 text-sm font-medium">Visibility Trend</div>
                <div className="absolute bottom-0 left-0 right-0 h-3/4">
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,100 L0,80 C50,30 80,70 100,50 L100,100 Z" 
                      fill="url(#gradient)" 
                    />
                    <path 
                      d="M0,80 C50,30 80,70 100,50" 
                      fill="none" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Mock Table */}
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="bg-secondary p-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Top Keywords at Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          className="pl-8 py-1 pr-3 text-sm rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-0">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Visibility</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Search Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm">Brand Analytics</td>
                        <td className="px-4 py-3 text-sm">3.2/10</td>
                        <td className="px-4 py-3 text-sm">#5</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Market Analysis</td>
                        <td className="px-4 py-3 text-sm">7.5/10</td>
                        <td className="px-4 py-3 text-sm">#2</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Growth Strategy</td>
                        <td className="px-4 py-3 text-sm">8.9/10</td>
                        <td className="px-4 py-3 text-sm">#1</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </BlurCard>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
