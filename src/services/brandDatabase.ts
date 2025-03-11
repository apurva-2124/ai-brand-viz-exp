
import { BrandData } from "@/components/BrandTracker";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const saveBrandData = async (data: BrandData): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('brand_submissions')
      .insert([{
        brand_name: data.name,
        industry: data.industry,
        keywords: data.keywords,
        email: data.email,
        competitors: data.competitors || [],
        description: data.description || '',
        website: data.website || '',
        submitted_at: new Date().toISOString()
      }]);

    if (error) {
      console.error("Error saving to Supabase:", error);
      toast.error(`Failed to save brand information: ${error.message}`);
      return false;
    }

    console.log("Brand data saved to Supabase successfully");
    toast.success("Brand information saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving brand data:", error);
    toast.error("Failed to connect to database. Please try again later.");
    return false;
  }
};

export const getBrandSubmissions = async (): Promise<BrandData[]> => {
  try {
    const { data, error } = await supabase
      .from('brand_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }

    return data.map(submission => ({
      name: submission.brand_name,
      industry: submission.industry,
      keywords: submission.keywords,
      email: submission.email,
      competitors: submission.competitors,
      description: submission.description,
      website: submission.website,
      lastUpdated: submission.submitted_at
    }));
  } catch (error) {
    console.error("Error fetching brand submissions:", error);
    return [];
  }
};
