
import { BrandData } from "@/components/BrandTracker";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const saveBrandData = async (data: BrandData): Promise<boolean> => {
  try {
    console.log("Attempting to save brand data to Supabase:", data);
    
    const { error, data: insertedData } = await supabase
      .from('brand_submissions')
      .insert([{
        brand_name: data.name,
        industry: data.industry,
        keywords: data.keywords,
        email: data.email,
        competitors: data.competitors || [],
        description: data.description || '',
        website: data.website || '',
        first_name: data.firstName,
        last_name: data.lastName,
        submitted_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error("Error saving to Supabase:", error);
      toast.error(`Failed to save brand information: ${error.message}`);
      return false;
    }

    console.log("Brand data saved to Supabase successfully:", insertedData);
    return true;
  } catch (error) {
    console.error("Error saving brand data:", error);
    toast.error("Failed to connect to database. Please try again later.");
    return false;
  }
};

export const getBrandSubmissions = async (): Promise<BrandData[]> => {
  try {
    console.log("Fetching brand submissions from Supabase");
    
    const { data, error } = await supabase
      .from('brand_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }

    console.log("Retrieved brand submissions:", data);
    
    return data.map(submission => ({
      name: submission.brand_name,
      industry: submission.industry,
      keywords: submission.keywords,
      email: submission.email,
      competitors: submission.competitors,
      description: submission.description,
      website: submission.website,
      lastUpdated: submission.submitted_at,
      firstName: submission.first_name,
      lastName: submission.last_name
    }));
  } catch (error) {
    console.error("Error fetching brand submissions:", error);
    return [];
  }
};

// Test function to verify database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log("Testing Supabase connection...");
    
    const { error } = await supabase
      .from('brand_submissions')
      .select('count(*)')
      .limit(1);
      
    if (error) {
      console.error("Database connection test failed:", error);
      toast.error("Database connection test failed. Please check console for details.");
      return false;
    }
    
    console.log("Database connection test successful!");
    toast.success("Successfully connected to the Supabase database!");
    return true;
  } catch (error) {
    console.error("Error testing database connection:", error);
    toast.error("Failed to test database connection. Please try again later.");
    return false;
  }
};
