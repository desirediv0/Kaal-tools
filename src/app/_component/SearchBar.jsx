import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
      onSearch(query);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setHasSearched(false);
      onSearch("");
    } else if (hasSearched) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full px-4 py-2 pl-10 border border-orange-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/20"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
