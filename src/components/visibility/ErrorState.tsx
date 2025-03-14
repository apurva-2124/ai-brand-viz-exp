
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Data</AlertTitle>
      <AlertDescription>
        {message || "Unable to load visibility data. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};
