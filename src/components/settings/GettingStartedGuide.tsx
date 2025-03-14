
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Info, Shield } from "lucide-react";

export interface GettingStartedGuideProps {
  onContinue: () => void;
}

export const GettingStartedGuide = ({ onContinue }: GettingStartedGuideProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ArrowUpRight className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Getting Started</h3>
        </div>
        
        <p className="text-muted-foreground">
          This experiment uses OpenAI's GPT-4 model to generate responses about brands and industries. Once generated, you can compare these AI descriptions with actual Google search results.
        </p>
        
        <div className="bg-slate-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-slate-700" />
            <h4 className="font-medium">No API Keys Required</h4>
          </div>
          
          <p className="text-sm text-muted-foreground">
            This application now uses a proxy service to access the OpenAI GPT-4 model. No API keys are required to use the functionality.
          </p>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Your data privacy is important. All queries are processed through a proxy service and no personal data is stored.
          </AlertDescription>
        </Alert>
        
        <div className="bg-slate-50 p-4 rounded-lg border mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-slate-700" />
            <h4 className="font-medium">How this works:</h4>
          </div>
          
          <p className="text-sm text-muted-foreground">
            This experiment explores how OpenAI's GPT-4 model describes brands and industries. After generating AI responses, you can easily compare them with web search results by clicking a Google Search button. The proxy service handles all API communication with OpenAI.
          </p>
        </div>
      </div>
      
      <Button className="w-full mt-6" onClick={onContinue}>
        Continue to Settings
      </Button>
    </div>
  );
};
