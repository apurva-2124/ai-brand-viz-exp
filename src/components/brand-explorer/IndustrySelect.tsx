
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brandIndustryKeywordMappings } from "@/lib/brandMappings";

interface IndustrySelectProps {
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
}

export const IndustrySelect = ({ selectedIndustry, setSelectedIndustry }: IndustrySelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Choose an Industry to Explore</label>
      <Select 
        value={selectedIndustry}
        onValueChange={setSelectedIndustry}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose an industry" />
        </SelectTrigger>
        <SelectContent>
          {[...new Set(brandIndustryKeywordMappings.map(mapping => mapping.industry))].map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
