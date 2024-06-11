import { ArrowUpIcon } from "@radix-ui/react-icons";

const ScrollToTopButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 right-4 bg-gray-600 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
  >
    <ArrowUpIcon className="h-6 w-6" />
  </button>
);

export default ScrollToTopButton;
