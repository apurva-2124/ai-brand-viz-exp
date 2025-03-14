
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export interface ApiKeyFormProps {
  onClose: () => void;
}

export const ApiKeyForm = ({ onClose }: ApiKeyFormProps) => {
  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Using OpenAI Proxy Service",
      description: "This application is using a proxy service for OpenAI access. No API keys required.",
    });
    
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">OpenAI Model Access</h3>
        </div>
        
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            This application uses a proxy service to access OpenAI GPT-4 model. No API keys are required to use the functionality.
          </AlertDescription>
        </Alert>
      </div>
      
      <Button className="w-full" onClick={saveSettings}>
        Close
      </Button>
    </div>
  );
};
