
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlurCard } from './ui/blur-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  LineChart, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Download,
  Info,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Analytics Dashboard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Side-by-Side Brand Visibility</h2>
            <p className="text-muted-foreground max-w-2xl">
              Compare your brand's performance across traditional search and AI platforms
              to identify opportunities and risks.
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-9 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                <span>Last 30 Days</span>
              </Button>
              <div className="bg-background border border-border rounded-md">
                <Button
                  variant={timeRange === 'week' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-9 rounded-r-none"
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </Button>
                <Button
                  variant={timeRange === 'month' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-9 rounded-none"
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </Button>
                <Button
                  variant={timeRange === 'quarter' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-9 rounded-l-none"
                  onClick={() => setTimeRange('quarter')}
                >
                  Quarter
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-3.5 w-3.5 mr-2" />
              <span>Export Report</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Brand Visibility Score</div>
                  <div className="text-3xl font-bold mt-1">87/100</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full mb-2">
                <div className="h-2 bg-primary rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% from last period</span>
              </div>
            </BlurCard>
            
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Ad Spend at Risk</div>
                  <div className="text-3xl font-bold mt-1">$12,450</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full mb-2">
                <div className="h-2 bg-destructive rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="flex items-center text-sm text-red-500">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>35% of total spend at risk</span>
              </div>
            </BlurCard>
            
            <BlurCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">AI Visibility Score</div>
                  <div className="text-3xl font-bold mt-1">6.2/10</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full mb-2">
                <div className="h-2 bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8% from last period</span>
              </div>
            </BlurCard>
          </div>

          <Tabs defaultValue="comparison" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
              <TabsTrigger value="trends">Visibility Trends</TabsTrigger>
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="space-y-6">
              <BlurCard className="p-6">
                <h3 className="text-lg font-medium mb-5 flex items-center">
                  Traditional vs. AI Search Performance
                  <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly Spend</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">SEO Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Paid Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Visibility</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">Brand Analytics</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">$1,200</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#5</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#2</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">3.2/10</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">Market Analysis</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">$2,500</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#2</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#1</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">7.5/10</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">Growth Strategy</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">$1,800</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#1</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#3</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">8.9/10</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">Competitive Analytics</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">$3,200</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#8</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#4</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">4.1/10</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">Brand Visibility</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">$2,100</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#3</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">#2</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">6.8/10</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </BlurCard>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlurCard className="p-6">
                  <div className="flex justify-between mb-6">
                    <h3 className="text-lg font-medium">AI Visibility Over Time</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-full bg-primary mr-1.5"></div>
                      <span>Visibility Score</span>
                    </div>
                  </div>
                  <div className="h-64 bg-secondary rounded-xl relative overflow-hidden">
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,100 L0,60 C25,80 50,20 75,40 L100,30 L100,100 Z" 
                        fill="url(#chartGradient)" 
                      />
                      <path 
                        d="M0,60 C25,80 50,20 75,40 L100,30" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="2" 
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 py-2 text-xs text-muted-foreground">
                      <span>1 Aug</span>
                      <span>8 Aug</span>
                      <span>15 Aug</span>
                      <span>22 Aug</span>
                      <span>29 Aug</span>
                    </div>
                  </div>
                </BlurCard>
                
                <BlurCard className="p-6">
                  <div className="flex justify-between mb-6">
                    <h3 className="text-lg font-medium">Spend at Risk</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-full bg-destructive mr-1.5"></div>
                      <span>At Risk ($)</span>
                    </div>
                  </div>
                  <div className="h-64 bg-secondary rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-between p-4">
                      <div className="w-[8%] h-[30%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[45%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[60%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[40%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[55%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[35%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[50%] bg-destructive rounded-t"></div>
                      <div className="w-[8%] h-[65%] bg-destructive rounded-t"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 py-2 text-xs text-muted-foreground">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4</span>
                    </div>
                  </div>
                </BlurCard>
              </div>
            </TabsContent>
            
            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BlurCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Prominent Mentions</h3>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">42</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Queries where your brand is a top recommendation
                  </p>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </BlurCard>
                
                <BlurCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Vague Mentions</h3>
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">28</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Queries where your brand appears without clarity
                  </p>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </BlurCard>
                
                <BlurCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Not Found</h3>
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">30</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Queries where your brand does not appear at all
                  </p>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </BlurCard>
              </div>
              
              <BlurCard className="p-6">
                <h3 className="text-lg font-medium mb-5">Financial Impact Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Total Monthly Ad Spend</span>
                        <span className="font-medium">$32,450</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Spend at Risk (Overall)</span>
                        <span className="font-medium">$12,450</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-destructive rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Projected Annual Impact</span>
                        <span className="font-medium">$149,400</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary rounded-xl p-5">
                    <h4 className="text-sm font-medium mb-3">Risk Breakdown</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                            <span>High Risk Keywords</span>
                          </span>
                          <span>$7,230</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full">
                          <div className="h-1.5 bg-red-500 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
                            <span>Medium Risk Keywords</span>
                          </span>
                          <span>$3,520</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full">
                          <div className="h-1.5 bg-yellow-500 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                            <span>Low Risk Keywords</span>
                          </span>
                          <span>$1,700</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full">
                          <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
