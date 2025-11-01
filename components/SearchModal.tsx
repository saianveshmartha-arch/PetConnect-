import React, { useState } from 'react';
import { CloseIcon, SearchIcon } from './Icons';

interface SearchModalProps {
  onSearch: (query: string, filters: Record<string, any>) => void;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onSearch, onClose }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, {}); // Pass filters here in a real app
    onClose();
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-200";
  const labelClass = "block text-sm font-medium text-slate-300";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">Search for a Pet</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSearch} className="p-6 space-y-6">
          <div>
            <label htmlFor="search-query" className={labelClass}>
              Search by Breed, Type, or Keyword
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="search-query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full rounded-md border-slate-600 bg-slate-700 py-2 pl-10 pr-3 text-sm placeholder-slate-400 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="e.g., Golden Retriever, Cat..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Age Range</label>
              <select className={inputClass}>
                <option>Any</option>
                <option>Puppy / Kitten (0-1 yrs)</option>
                <option>Young (1-3 yrs)</option>
                <option>Adult (3-7 yrs)</option>
                <option>Senior (7+ yrs)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" placeholder="Near current location" className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-600 rounded-lg hover:bg-slate-500">Cancel</button>
            <button type="submit" className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600">
                <SearchIcon className="h-4 w-4" />
                Find Pets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;