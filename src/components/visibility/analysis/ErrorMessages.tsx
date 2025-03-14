
import { AlertTriangle, Wifi } from "lucide-react";

interface ErrorMessagesProps {
  allProxyErrors: boolean;
  allNoContent: boolean;
}

export const ErrorMessages = ({ allProxyErrors, allNoContent }: ErrorMessagesProps) => {
  if (!allProxyErrors && !allNoContent) return null;
  
  return (
    <>
      {allProxyErrors && (
        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4 text-blue-800 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium">AI Proxy Server Temporarily Unavailable</p>
            <p className="text-sm mt-1">
              The AI proxy server is currently unreachable. We're displaying sample data for demonstration purposes.
            </p>
          </div>
        </div>
      )}
      
      {allNoContent && !allProxyErrors && (
        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4 text-blue-800 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium">API Response Format Issue</p>
            <p className="text-sm mt-1">
              The AI proxy returned a success response but we couldn't extract the content. This could be due to changes in the API response format.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
