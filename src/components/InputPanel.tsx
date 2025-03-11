
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlurCard } from './ui/blur-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { Upload, Plus, Trash2, AlertCircle, FileText, Link, DollarSign } from 'lucide-react';

interface Keyword {
  id: string;
  name: string;
  spend: number;
}

const InputPanel = () => {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: '1', name: 'brand analytics', spend: 1200 },
    { id: '2', name: 'market analysis tools', spend: 2500 },
    { id: '3', name: 'competitive intelligence', spend: 1800 },
  ]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newKeywordSpend, setNewKeywordSpend] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  const handleIndustryChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomIndustry(true);
      setIndustry('');
    } else {
      setShowCustomIndustry(false);
      setIndustry(value);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() === '') return;
    
    const newKeywordObj: Keyword = {
      id: Date.now().toString(),
      name: newKeyword.trim(),
      spend: Number(newKeywordSpend) || 0
    };
    
    setKeywords([...keywords, newKeywordObj]);
    setNewKeyword('');
    setNewKeywordSpend('');
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter(keyword => keyword.id !== id));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Configuration
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Set Up Your Brand Monitoring</h2>
            <p className="text-muted-foreground max-w-2xl">
              Configure your brand details to track visibility across AI platforms, analyze competitors, 
              and assess financial risks.
            </p>
          </div>

          <BlurCard className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-6 md:p-8 md:border-r border-border">
                <h3 className="text-lg font-medium mb-6">Brand Information</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="brand-name">Brand Name</Label>
                    <Input
                      id="brand-name"
                      placeholder="Enter your brand name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={handleIndustryChange}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="custom">Custom...</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {showCustomIndustry && (
                      <div className="mt-2">
                        <Input
                          placeholder="Enter custom industry"
                          value={customIndustry}
                          onChange={(e) => setCustomIndustry(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-query">Custom AI Query</Label>
                    <Input
                      id="custom-query"
                      placeholder="Test your brand visibility here"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a custom query to test how your brand appears in AI responses
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 p-6 md:p-8 bg-muted/30">
                <h3 className="text-lg font-medium mb-6">Keywords & Ad Spend</h3>
                
                <div className="mb-6">
                  <div className="flex items-end gap-3 mb-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="keyword">Keyword</Label>
                      <Input
                        id="keyword"
                        placeholder="Enter keyword"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor="spend">Spend ($)</Label>
                      <Input
                        id="spend"
                        type="number"
                        placeholder="0"
                        value={newKeywordSpend}
                        onChange={(e) => setNewKeywordSpend(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={addKeyword}
                      className="mb-0.5 h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">
                      Total Keywords: {keywords.length}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
                      <Upload className="h-3.5 w-3.5 mr-1" />
                      <span>Upload CSV</span>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-background border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 border-b border-border text-xs font-medium">
                    <div className="col-span-6">Keyword</div>
                    <div className="col-span-3">Monthly Spend</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {keywords.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Add keywords to track their visibility</p>
                      </div>
                    ) : (
                      keywords.map((keyword) => (
                        <div 
                          key={keyword.id} 
                          className="grid grid-cols-12 gap-4 items-center p-3 border-b border-border text-sm"
                        >
                          <div className="col-span-6 flex items-center">
                            <Link className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span>{keyword.name}</span>
                          </div>
                          <div className="col-span-3 flex items-center">
                            <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{keyword.spend.toLocaleString()}</span>
                          </div>
                          <div className="col-span-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeKeyword(keyword.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                    <span>All keywords will be tracked across AI platforms</span>
                  </div>
                  <Button>
                    Start Monitoring
                  </Button>
                </div>
              </div>
            </div>
          </BlurCard>
        </div>
      </div>
    </section>
  );
};

export default InputPanel;
