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
          }
        }
      });
    };
    initializeAutocomplete();
  }, [onSelectAddress]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      const searchQuery = inputRef.current.value;
      onSelectAddress(searchQuery);
      inputRef.current.value = ''; // Reset input
    }
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Address"
        required
        onKeyDown={handleKeyPress}
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}
