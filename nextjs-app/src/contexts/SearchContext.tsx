'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SearchContextProps {
  searches: string[];
  addSearch: (searchQuery: string) => void;
  removeSearch: (searchQuery: string) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searches: [],
  addSearch: () => {},
  removeSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searches, setSearches] = useState<string[]>([]);
  useEffect(() => {
    const storedSearches = localStorage.getItem('searches');
    if (storedSearches && storedSearches?.length > 1) {
      setSearches(JSON.parse(storedSearches));
    }
  }, []);

  const addSearch = (searchQuery: string) => {
    const updatedSearches = [searchQuery, ...searches];
    console.log('updatedSearches', updatedSearches);
    setSearches(updatedSearches);
    localStorage.setItem('searches', JSON.stringify(updatedSearches));
  };
  const removeSearch = (searchQuery: string) => {
    const updatedSearches = searches.filter((search) => search !== searchQuery);
    setSearches(updatedSearches);
    localStorage.setItem('searches', JSON.stringify(updatedSearches));
  };

  return (
    <SearchContext.Provider value={{ searches, addSearch, removeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
