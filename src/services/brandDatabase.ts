
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

// Enhanced database connection test with detailed logging
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log("Testing Supabase connection...");
    // Remove accessing protected supabaseUrl property
    console.log("Using Supabase configuration from environment");
    
    // First, check if we can connect to Supabase at all
    const { error: healthError } = await supabase.from('brand_submissions').select('count(*)');
    
    if (healthError) {
      console.error("Initial connection test failed:", healthError);
      
      // Try to get more specific error information
      if (healthError.code === "PGRST116") {
        console.error("Table does not exist. Please make sure you've created the brand_submissions table.");
        toast.error("The brand_submissions table doesn't exist. Please create it first.");
        return false;
      }
      
      if (healthError.code === "PGRST301") {
        console.error("Permission denied. Check your RLS policies.");
        toast.error("Permission denied. Check your Row Level Security policies in Supabase.");
        return false;
      }
      
      if (healthError.message.includes("Failed to fetch")) {
        console.error("Network error. Check your internet connection or Supabase service status.");
        toast.error("Network error. Check your internet connection or Supabase service status.");
        return false;
      }
      
      toast.error(`Database connection failed: ${healthError.message}`);
      return false;
    }
    
    // Now test a specific query to verify table structure
    console.log("Checking table structure...");
    const { error: tableError } = await supabase
      .from('brand_submissions')
      .select('brand_name, first_name, last_name')
      .limit(1);
      
    if (tableError) {
      console.error("Table structure test failed:", tableError);
      
      if (tableError.message.includes("column") && tableError.message.includes("does not exist")) {
        toast.error("Table structure issue: Some columns are missing. Check console for details.");
      } else {
        toast.error(`Table structure issue: ${tableError.message}`);
      }
      return false;
    }
    
    console.log("Database connection and table structure verified successfully!");
    toast.success("Successfully connected to the Supabase database!");
    return true;
  } catch (error: any) {
    console.error("Error testing database connection:", error);
    toast.error(`Connection test failed: ${error?.message || "Unknown error"}`);
    return false;
  }
};
