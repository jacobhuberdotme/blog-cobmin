import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = ({ handleSearch }: { handleSearch: (term: string) => void }) => {
  const handleChange = useDebouncedCallback((term: string) => {
    handleSearch(term);
  }, 300);

  return (
    <div className="container mx-auto p-4 mb-8">
      <form className="flex justify-center mb-4">
        <Input
          type="number"
          placeholder="Search by Edition Number"
          onChange={(e) => handleChange(e.target.value)}
          className="w-1/2 mr-4"
        />
      </form>
    </div>
  );
};

export default SearchInput;
