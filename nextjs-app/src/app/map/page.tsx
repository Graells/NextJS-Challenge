'use client';

import Mapa from '@/components/Mapa';
import Search from '@/components/Search';
import { useSearch } from '@/contexts/SearchContext';

export default function MapPage() {
  const { searches, addSearch } = useSearch();
  const recentSearch = searches[0] || 'Barcelona';

  const handleSearch = (searchQuery: string) => {
    addSearch(searchQuery);
    console.log('searchesToContext', searches);
  };
  return (
    <div>
      <div>Brickbro logo map page</div>
      <Search onSelectAddress={handleSearch} />
      <Mapa address={recentSearch} />
      <div>
        <h2>Búsquedas</h2>
        <ul>
          {searches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
