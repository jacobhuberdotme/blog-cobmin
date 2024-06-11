import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const SortSelect = ({ handleSort }: { handleSort: (sortOption: string) => void }) => {
  return (
    <Select onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="number-asc">NFT Number (Asc)</SelectItem>
        <SelectItem value="number-desc">NFT Number (Desc)</SelectItem>
        <SelectItem value="rarity-asc">Rarity (Asc)</SelectItem>
        <SelectItem value="rarity-desc">Rarity (Desc)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
