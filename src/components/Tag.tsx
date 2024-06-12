import { Badge } from "@/components/ui/badge";

const Tag = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
  return (
    <Badge variant="outline" className="inline-flex items-center m-1">
      {label}
      <button
        type="button"
        className="ml-1 p-1"
        onClick={onRemove}
      >
        <span className="sr-only">Remove filter</span>
        &times;
      </button>
    </Badge>
  );
};

export default Tag;
