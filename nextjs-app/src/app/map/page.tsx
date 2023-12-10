'use client';

import Mapa from '@/components/Mapa';
import Search from '@/components/Search';
import { useSearch } from '@/contexts/SearchContext';
import Image from 'next/image';
import { useState } from 'react';

export default function MapPage() {
  const { searches, addSearch } = useSearch();
  const [selectedAddress, setSelectedAddress] = useState(
    searches[0] || 'Barcelona',
  );

  const handleSearch = (searchQuery: string) => {
    addSearch(searchQuery);
    setSelectedAddress(searchQuery);
    // console.log('searchesToContext', searches);
  };
  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
  };
  return (
    <div>
      <Image
        src="/brickbroLogo.png"
        alt="brickbroLogo"
        width={300}
        height={77.73}
        className="ml-16 mb-8 mt-4"
        priority
      ></Image>
      <div className="ml-16 mb-8 mr-16">
        <Search onSelectAddress={handleSearch} />
        <Mapa address={selectedAddress} />
      </div>
      <div className="border-2 border-gray-300 rounded-md mr-16 ml-16 mb-16 p-6">
        <h2 className=" font-bold text-gray-500 mb-3">Búsquedas</h2>
        <ul>
          {searches.map((search, index) => (
            <li
              className="mb-2 cursor-pointer"
              key={index}
              onClick={() => handleSelectAddress(search)}
            >
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
