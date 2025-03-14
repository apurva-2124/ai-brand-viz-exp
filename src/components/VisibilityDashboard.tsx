
import { BrandData } from "@/components/BrandTracker";
import { DashboardHeader } from "@/components/visibility/DashboardHeader";
import { AlertMessages } from "@/components/visibility/AlertMessages";
import { DashboardSkeleton } from "@/components/visibility/DashboardSkeleton";
import { ErrorState } from "@/components/visibility/ErrorState";
import { DashboardContent } from "@/components/visibility/DashboardContent";
import { useVisibilityDashboard } from "@/hooks/useVisibilityDashboard";

interface VisibilityDashboardProps {
  brandData: BrandData;
}

export const VisibilityDashboard = ({ brandData }: VisibilityDashboardProps) => {
  const {
    loading,
    error,
    visibilityData,
    provider,
    setProvider,
    queryType,
    setQueryType,
    useMockData,
    setUseMockData,
    fetchData,
    handleExportCSV
  } = useVisibilityDashboard(brandData);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!visibilityData) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        loading={loading}
        provider={provider}
        setProvider={setProvider}
        queryType={queryType}
        setQueryType={setQueryType}
        useMockData={useMockData}
        setUseMockData={setUseMockData}
        fetchData={fetchData}
        handleExportCSV={handleExportCSV}
        visibilityData={visibilityData}
      />

      <AlertMessages 
        error={error} 
        riskLevel={visibilityData.riskLevel} 
      />

      <DashboardContent 
        brandData={brandData}
        visibilityData={visibilityData}
        useMockData={useMockData}
        loading={loading}
        error={error}
      />
    </div>
  );
};
