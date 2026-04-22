'use client';

import { Search, X } from 'lucide-react';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce'; // Need to create this

export default function LeadSearch() {
  const { filters, setSearch } = useLeadFilters();
  const [inputValue, setInputValue] = useState(filters.search);

  // Sync internal state with store (useful for reset)
  useEffect(() => {
    setInputValue(filters.search);
  }, [filters.search]);

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== filters.search) {
        setSearch(inputValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, filters.search, setSearch]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-11 w-full rounded-xl border bg-card/50 pl-10 pr-10 text-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4"
      />
      {inputValue && (
        <button
          onClick={() => setInputValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
