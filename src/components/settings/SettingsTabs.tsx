
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GettingStartedGuide } from "./GettingStartedGuide";
import { ApiKeyForm } from "./ApiKeyForm";

export interface SettingsTabsProps {
  onClose: () => void;
}

export const SettingsTabs = ({ onClose }: SettingsTabsProps) => {
  const [activeTab, setActiveTab] = useState("guide");
  
  const handleContinueToKeys = () => {
    setActiveTab("keys");
  };
  
  const handleBackToGuide = () => {
    setActiveTab("guide");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="guide">Getting Started</TabsTrigger>
        <TabsTrigger value="keys">API Keys</TabsTrigger>
      </TabsList>
      
      <TabsContent value="guide" className="space-y-6">
        <GettingStartedGuide onContinue={handleContinueToKeys} />
      </TabsContent>
      
      <TabsContent value="keys" className="space-y-6">
        <ApiKeyForm onClose={onClose} />
        
        <button 
          onClick={handleBackToGuide} 
          className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50"
        >
          Back to Getting Started
        </button>
      </TabsContent>
    </Tabs>
  );
};
