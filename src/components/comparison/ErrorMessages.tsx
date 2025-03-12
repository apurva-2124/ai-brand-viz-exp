
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Ban, Info } from "lucide-react";

interface ErrorMessagesProps {
  errorMessage: string | null;
  apiLimitExceeded: boolean;
}

export const ErrorMessages = ({ errorMessage, apiLimitExceeded }: ErrorMessagesProps) => {
  if (!errorMessage && !apiLimitExceeded) return null;
  
  return (
    <>
      {errorMessage && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {apiLimitExceeded && (
        <Alert variant="destructive" className="my-4">
          <Ban className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">SerpApi key missing or limit exceeded</p>
            <p className="text-sm mt-1">
              {!localStorage.getItem("serpapi_api_key") 
                ? "No SerpApi key found. Please add your SerpApi key in the settings." 
                : "The free SerpApi limit (100 searches/month) has been reached or the API key is invalid."}
            </p>
            <p className="text-sm mt-2">
              <strong>Troubleshooting tips:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Verify your API key in settings matches your SerpApi dashboard</li>
                <li>Check your API usage in the SerpApi dashboard</li>
                <li>Try a simpler search query (1-3 words)</li>
                <li>If using a free tier, you may be rate limited</li>
              </ul>
            </p>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
