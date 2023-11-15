'use client';

import Search from '@/components/Search';
import { useSearch } from '@/contexts/SearchContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { addSearch } = useSearch();

  const handleSearch = (searchQuery: string) => {
    addSearch(searchQuery);
    router.push('/map');
  };

  return (
    <>
      <div>Brickbro logo home</div>
      <Search onSelectAddress={handleSearch} />
    </>
  );
}
