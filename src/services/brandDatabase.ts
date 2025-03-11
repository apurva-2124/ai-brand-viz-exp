
import { BrandData } from "@/components/BrandTracker";
import { toast } from "sonner";

// This function will be connected to Supabase after integration
export const saveBrandData = async (data: BrandData): Promise<boolean> => {
  try {
    // Store in localStorage temporarily until Supabase is connected
    const existingData = localStorage.getItem("brand_submissions");
    const submissions = existingData ? JSON.parse(existingData) : [];
    
    // Add timestamp and ID
    const submissionWithMeta = {
      ...data,
      id: `brand-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    
    submissions.push(submissionWithMeta);
    localStorage.setItem("brand_submissions", JSON.stringify(submissions));
    
    console.log("Brand data saved:", submissionWithMeta);
    return true;
  } catch (error) {
    console.error("Error saving brand data:", error);
    return false;
  }
};

export const getBrandSubmissions = (): BrandData[] => {
  const existingData = localStorage.getItem("brand_submissions");
  return existingData ? JSON.parse(existingData) : [];
};
