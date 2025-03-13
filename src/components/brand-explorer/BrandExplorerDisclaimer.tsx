
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const BrandExplorerDisclaimer = () => {
  return (
    <Alert variant="default" className="bg-background border-muted-foreground/20 mt-8">
      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      <AlertDescription className="text-muted-foreground text-sm">
        <strong>Disclaimer:</strong> This is an open-source experiment analyzing AI-generated search results. 
        I do not represent or endorse any brands listed in this tool. AI-generated responses may change over 
        time and are not always accurate. This tool is for research purposes only and should not be used for 
        brand monitoring or SEO decisions.
      </AlertDescription>
    </Alert>
  );
};
