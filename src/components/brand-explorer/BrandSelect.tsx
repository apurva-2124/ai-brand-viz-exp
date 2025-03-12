
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrandsByIndustry } from "@/lib/brandMappings";

interface BrandSelectProps {
  selectedIndustry: string;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
}

export const BrandSelect = ({ selectedIndustry, selectedBrand, onBrandChange }: BrandSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Pick a Brand to Analyze</label>
      <Select 
        value={selectedBrand}
        onValueChange={onBrandChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a brand" />
        </SelectTrigger>
        <SelectContent>
          {getBrandsByIndustry(selectedIndustry).map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
