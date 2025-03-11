
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingDown, WandSparkles, PhoneCall, Info, Clock } from "lucide-react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            AI Visibility Report
          </CardTitle>
          <CardDescription>Current AI Search Performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="text-3xl font-bold mb-2">{visibilityScore}/100</div>
            <p className="text-red-600 font-medium">
              Your AI search ranking needs improvement
            </p>
          </div>
          <Button component={Link} to="/optimize" className="w-full">
            Optimize My Brand for AI Search
          </Button>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  AI-optimized content strategies can significantly improve your brand's visibility in AI search results
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WandSparkles className="h-5 w-5 text-purple-500" />
            AI Optimization Toolkit
          </CardTitle>
          <CardDescription>Enhance Your AI Presence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Want to rank higher in AI search? Implement AI-optimized content strategies to improve your visibility.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">$99</Badge>
            <span className="text-sm text-muted-foreground">One-time purchase</span>
          </div>
          <Button 
            component={Link} 
            to="/optimize" 
            onClick={handleToolkitPurchase} 
            variant="outline" 
            className="w-full"
          >
            Get AI Optimization Toolkit
          </Button>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-2 border-primary">
        <div className="absolute top-2 right-2">
          <Badge variant="destructive" className="animate-pulse">
            <Clock className="h-3 w-3 mr-1" />
            5 spots left
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-green-500" />
            1:1 AI Strategy Call
          </CardTitle>
          <CardDescription>Expert Guidance for Your Brand</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Get personalized strategies to dominate AI search results with a dedicated AI visibility expert.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">$499</Badge>
            <span className="text-sm text-muted-foreground">60-min consultation</span>
          </div>
          <Button 
            component={Link} 
            to="/optimize" 
            onClick={handleBookCall} 
            variant="default" 
            className="w-full"
          >
            Book My AI Strategy Call
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
