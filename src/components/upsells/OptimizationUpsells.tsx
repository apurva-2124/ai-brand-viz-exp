
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WandSparkles, Code, PhoneCall, Info, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface OptimizationUpsellsProps {
  visibilityScore: number;
}

export const OptimizationUpsells = ({ visibilityScore }: OptimizationUpsellsProps) => {
  const { toast } = useToast();
  
  const handleToolkitPurchase = () => {
    toast({
      title: "Redirecting",
      description: "Taking you to the AI Optimization page",
    });
  };
  
  const handleBookCall = () => {
    toast({
      title: "Coming Soon",
      description: "Booking for AI Strategy Calls will open soon!",
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <Card className="border-2 hover:border-primary/50 transition-all flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full justify-center">
                <WandSparkles className="h-5 w-5 text-purple-500" />
                <span className="text-center">AI Brand Visibility Optimization Toolkit</span>
              </div>
            </CardTitle>
            <Badge variant="secondary">$99</Badge>
          </div>
          <CardDescription className="text-center">
            Step-by-step guides to structure your content for AI search
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>AI-optimized content templates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Keyword research methodology</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Content structure guidelines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Self-implementation approach</span>
            </li>
          </ul>
          <div className="mt-auto">
            <Link to="/optimize" className="w-full">
              <Button className="w-full">
                Get Started For $99
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-all flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full justify-center">
                <Code className="h-5 w-5 text-blue-500" />
                <span className="text-center">AI-Optimized FAQ & Schema</span>
              </div>
            </CardTitle>
            <Badge variant="secondary">$299</Badge>
          </div>
          <CardDescription className="text-center">
            Hands-on guidance to embed structured data
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Custom FAQ development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Schema markup implementation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Technical implementation guide</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>2 weeks of implementation support</span>
            </li>
          </ul>
          <div className="mt-auto">
            <Link to="/optimize" className="w-full">
              <Button className="w-full">
                Get Started For $299
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary hover:border-primary/80 transition-all relative overflow-hidden flex flex-col">
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg animate-pulse" variant="destructive">
            Only 5 spots left!
          </Badge>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full justify-center">
                <PhoneCall className="h-5 w-5 text-green-500" />
                <span className="text-center">AI Search Visibility Accelerator</span>
              </div>
            </CardTitle>
            <Badge variant="secondary">$499+</Badge>
          </div>
          <CardDescription className="text-center">
            1:1 Coaching & Custom strategy to rank in AI-driven search
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Personalized AI visibility audit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Custom content strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>60-min strategy session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>4 weeks of implementation support</span>
            </li>
          </ul>
          <div className="mt-auto">
            <Link to="/optimize" className="w-full">
              <Button variant="default" className="w-full">
                Book My Strategy Call
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
