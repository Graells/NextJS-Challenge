// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

'use client';

import loadGoogleMapsApi from '@/services/GoogleMapsLoader';
import { useEffect, useRef } from 'react';

interface SearchProps {
  onSelectAddress: (searchQuery: string) => void;
}

export default function Search({ onSelectAddress }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGoogleMapsApi();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      if (!inputRef.current) return;
      const { Autocomplete } = (await google.maps.importLibrary(
        'places',
      )) as google.maps.PlacesLibrary;
      const autocomplete = new Autocomplete(inputRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          console.log('Formatted address:', place.formatted_address);
          onSelectAddress(place.formatted_address);
          if (inputRef.current) {
            inputRef.current.value = ''; // Reset input
            inputRef.current.blur(); // Remove focus
          }
        }
      });
    };
    initializeAutocomplete();
  }, [onSelectAddress]);

  const handleSearch = () => {
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      const searchQuery = inputRef.current.value.trim();
      onSelectAddress(searchQuery);
      inputRef.current.value = ''; // Reset input
      inputRef.current.blur(); // Remove focus
    } else if (inputRef.current) {
      inputRef.current.value = ''; // Reset input
      inputRef.current?.focus();
      alert('Please enter a search query.');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        ref={inputRef}
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Address"
        required
        onKeyDown={handleKeyPress}
        aria-label="Search address"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {/* <MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-500 hover:text-gray-900" /> */}
        Search
      </button>
    </div>
  );
}
