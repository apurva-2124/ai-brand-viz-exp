
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlurCard } from './ui/blur-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Award,
  Shield,
  Search,
  MoreHorizontal
} from 'lucide-react';

const CompetitorOverview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Competitor Analysis
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Know Your Competition</h2>
            <p className="text-muted-foreground max-w-2xl">
              Monitor how competitors perform across AI platforms and identify
              opportunities to outperform them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Competitors Detected</div>
                  <div className="text-3xl font-bold mt-1">14</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-detected brands competing for your keywords
              </p>
            </BlurCard>
            
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Top Competitor</div>
                  <div className="text-xl font-bold mt-1">CompetitorX</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="text-3xl font-bold">8.7</div>
                <div className="text-sm text-muted-foreground ml-2">/10 AI Visibility</div>
              </div>
            </BlurCard>
            
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Your Position</div>
                  <div className="text-3xl font-bold mt-1">#3</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-500">Up 2 positions from last month</span>
              </div>
            </BlurCard>
          </div>

          <BlurCard className="mb-12 overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-medium">Top Competitors Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Competitor</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Visibility</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">SEO Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Paid Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Keywords</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">CX</div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">CompetitorX</div>
                          <div className="text-xs text-muted-foreground">competitorx.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">8.7/10</div>
                      <div className="w-24 h-1.5 bg-secondary rounded-full mt-1">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#3</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          analytics
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          brand
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+12%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">CY</div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">CompetitorY</div>
                          <div className="text-xs text-muted-foreground">competitory.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">8.2/10</div>
                      <div className="w-24 h-1.5 bg-secondary rounded-full mt-1">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          analytics
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          tracking
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+8%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">YB</div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">Your Brand</div>
                          <div className="text-xs text-muted-foreground">yourbrand.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">6.2/10</div>
                      <div className="w-24 h-1.5 bg-white/30 rounded-full mt-1">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/30">
                          analytics
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/30">
                          visibility
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+14%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">CZ</div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">CompetitorZ</div>
                          <div className="text-xs text-muted-foreground">competitorz.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">5.9/10</div>
                      <div className="w-24 h-1.5 bg-secondary rounded-full mt-1">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: '59%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#5</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          growth
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary">
                          brand
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-red-500 text-sm">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span>-3%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BlurCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlurCard className="overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium">AI vs. Traditional Search</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  How you compare to competitors across platforms
                </p>
              </div>
              
              <div className="p-6">
                <div className="h-64 bg-secondary rounded-xl relative overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-end justify-around p-4">
                    <div className="w-[15%] flex flex-col items-center">
                      <div className="h-[55%] bg-primary/70 rounded-t w-full mb-1"></div>
                      <div className="h-[35%] bg-primary rounded-t w-full"></div>
                      <div className="text-xs mt-2">Your Brand</div>
                    </div>
                    <div className="w-[15%] flex flex-col items-center">
                      <div className="h-[80%] bg-primary/70 rounded-t w-full mb-1"></div>
                      <div className="h-[30%] bg-primary rounded-t w-full"></div>
                      <div className="text-xs mt-2">Competitor X</div>
                    </div>
                    <div className="w-[15%] flex flex-col items-center">
                      <div className="h-[70%] bg-primary/70 rounded-t w-full mb-1"></div>
                      <div className="h-[40%] bg-primary rounded-t w-full"></div>
                      <div className="text-xs mt-2">Competitor Y</div>
                    </div>
                    <div className="w-[15%] flex flex-col items-center">
                      <div className="h-[45%] bg-primary/70 rounded-t w-full mb-1"></div>
                      <div className="h-[30%] bg-primary rounded-t w-full"></div>
                      <div className="text-xs mt-2">Competitor Z</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-primary/70 mr-2"></div>
                    <span className="text-sm">Traditional Search</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-primary mr-2"></div>
                    <span className="text-sm">AI Visibility</span>
                  </div>
                </div>
              </div>
            </BlurCard>
            
            <BlurCard className="overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium">Competitive Keyword Gap</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Keywords where competitors outperform you
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4/12 text-sm">Market Analysis</div>
                    <div className="w-7/12 h-2 bg-secondary rounded-full mx-2">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="w-1/12 text-right text-sm">85%</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4/12 text-sm">Data Visualization</div>
                    <div className="w-7/12 h-2 bg-secondary rounded-full mx-2">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <div className="w-1/12 text-right text-sm">72%</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4/12 text-sm">Brand Intelligence</div>
                    <div className="w-7/12 h-2 bg-secondary rounded-full mx-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                    <div className="w-1/12 text-right text-sm">64%</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4/12 text-sm">Marketing Analytics</div>
                    <div className="w-7/12 h-2 bg-secondary rounded-full mx-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: '53%' }}></div>
                    </div>
                    <div className="w-1/12 text-right text-sm">53%</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4/12 text-sm">AI Marketing</div>
                    <div className="w-7/12 h-2 bg-secondary rounded-full mx-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    <div className="w-1/12 text-right text-sm">32%</div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-xs">Large Gap</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-xs">Medium Gap</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs">Small Gap</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    <Search className="h-3.5 w-3.5 mr-1.5" />
                    <span>View All</span>
                  </Button>
                </div>
              </div>
            </BlurCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorOverview;
