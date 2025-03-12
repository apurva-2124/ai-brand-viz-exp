
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface AlertMessagesProps {
  error: string | null;
  riskLevel?: string;
}

export const AlertMessages = ({ error, riskLevel }: AlertMessagesProps) => {
  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {riskLevel === "high" && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Spend at Risk - Competitive Displacement</AlertTitle>
          <AlertDescription>
            Your brand is being outranked by competitors in AI responses. This may lead to decreased visibility and potential revenue loss.
          </AlertDescription>
        </Alert>
      )}
      
      {riskLevel === "medium" && (
        <Alert variant="default" className="mb-4 bg-yellow-50 border-yellow-200 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Visibility Risk Detected</AlertTitle>
          <AlertDescription>
            Your brand has limited visibility in some AI responses, with competitors gaining traction.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
