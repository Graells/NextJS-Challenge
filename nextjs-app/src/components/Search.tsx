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
    <div className="flex w-full space-x-5 mb-8 mx-auto">
      <input
        ref={inputRef}
        id="search"
        className="ml-2 w-full  h-10 p-1 bg-gray-200 hover:bg-gray-300 rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 placeholder: text-center"
        placeholder="🔍 Address"
        required
        onKeyDown={handleKeyPress}
        aria-label="Search address"
      />
      <button
        onClick={handleSearch}
        className="mr-2 rounded-md bg-gray-200 w-auto h-10 px-6 py-2 text-gray hover:bg-gray-300"
      >
        Search
      </button>
    </div>
  );
}
