
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InformationCircle } from "lucide-react";

export interface ApiKeyFormProps {
  onClose: () => void;
}

export const ApiKeyForm = ({ onClose }: ApiKeyFormProps) => {
  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Using Proxy API Service",
      description: "This application is using a proxy service for AI model access. No API keys required.",
    });
    
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <InformationCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Model Access</h3>
        </div>
        
        <Alert className="bg-blue-50 border-blue-200">
          <InformationCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            This application now uses a proxy service to access AI models. No API keys are required to use the functionality.
          </AlertDescription>
        </Alert>
      </div>
      
      <Button className="w-full" onClick={saveSettings}>
        Close
      </Button>
    </div>
  );
};
