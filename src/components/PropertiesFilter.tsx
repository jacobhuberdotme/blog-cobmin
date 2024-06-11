import * as React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/components/ui/checkbox';
import { NFT } from '@/types/nft';

interface PropertiesFilterProps {
  nfts: NFT[];
  selectedProperties: Record<string, string[]>;
  onChange: (selectedProperties: Record<string, string[]>) => void;
  traitCounts: Record<string, { count: number; values: Record<string, { count: number; rarity: string }> }>;
}

const PropertiesFilter: React.FC<PropertiesFilterProps> = ({ nfts, selectedProperties, onChange, traitCounts }) => {
  const traitTypes = Object.keys(traitCounts).map(trait_type => ({
    trait_type,
    values: Object.keys(traitCounts[trait_type].values).map(value => ({
      value,
      count: traitCounts[trait_type].values[value].count,
      rarity: traitCounts[trait_type].values[value].rarity,
    })).sort((a, b) => a.value.localeCompare(b.value)),
  })).sort((a, b) => a.trait_type.localeCompare(b.trait_type));

  const handleCheckboxChange = (traitType: string, value: string) => {
    const updated = { ...selectedProperties };
    if (!updated[traitType]) {
      updated[traitType] = [];
    }
    if (updated[traitType].includes(value)) {
      updated[traitType] = updated[traitType].filter(val => val !== value);
      if (updated[traitType].length === 0) {
        delete updated[traitType];
      }
    } else {
      updated[traitType].push(value);
    }
    onChange(updated);
  };

  return (
    <Collapsible className="mb-4">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Properties [{traitTypes.length}]</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4 px-4 py-2">
        {traitTypes.map(({ trait_type, values }) => (
          <Collapsible key={trait_type} className="mb-2">
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold">{trait_type} [{values.length}]</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              {values.map(({ value, count, rarity }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedProperties[trait_type]?.includes(value) || false}
                    onCheckedChange={() => handleCheckboxChange(trait_type, value)}
                  />
                  <span>{value} [{count}] ({rarity}%)</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PropertiesFilter;
