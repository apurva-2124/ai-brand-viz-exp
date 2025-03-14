
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Ban, Info, Wifi } from "lucide-react";

interface ErrorMessagesProps {
  errorMessage: string | null;
  apiLimitExceeded: boolean;
}

export const ErrorMessages = ({ errorMessage, apiLimitExceeded }: ErrorMessagesProps) => {
  // Only show errors if we have specific error messages
  if (!errorMessage && !apiLimitExceeded) return null;
  
  console.log("Displaying error messages:", { errorMessage, apiLimitExceeded });
  
  // Check if the error is proxy related
  const isProxyError = errorMessage && (
    errorMessage.includes("Proxy server") || 
    errorMessage.includes("Failed to fetch") ||
    errorMessage.includes("timeout")
  );
  
  return (
    <>
      {errorMessage && !isProxyError && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isProxyError && (
        <Alert variant="destructive" className="my-4">
          <Wifi className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">AI Proxy Server Issue</p>
            <p className="text-sm mt-1">
              {errorMessage}
            </p>
            <p className="text-sm mt-2">
              <strong>Troubleshooting tips:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Check your internet connection</li>
                <li>The AI proxy server might be temporarily down</li>
                <li>Try again in a few minutes</li>
              </ul>
            </p>
          </AlertDescription>
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
