
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
    errorMessage.includes("timeout") ||
    errorMessage.includes("unreachable")
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
        <Alert variant="info" className="my-4 border-blue-200 bg-blue-50">
          <Wifi className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            <p className="font-medium text-blue-700">AI Proxy Server Temporarily Unavailable</p>
            <p className="text-sm mt-1 text-blue-600">
              {errorMessage}
            </p>
            <p className="text-sm mt-2 text-blue-600">
              <strong>Try these steps:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Wait a moment and try again</li>
                <li>Check your internet connection</li>
                <li>The demo will show mock data for now to demonstrate the UI</li>
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
