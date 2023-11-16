'use client';

import Search from '@/components/Search';
import { useSearch } from '@/contexts/SearchContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { addSearch } = useSearch();

  const handleSearch = (searchQuery: string) => {
    addSearch(searchQuery);
    router.push('/map');
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen max-w-xl mx-auto">
      <Image
        src="/brickbroLogo.png"
        alt="brickbroLogo"
        width={300}
        height={77.73}
        className="mb-16"
        priority
      ></Image>
      <Search onSelectAddress={handleSearch} />
    </div>
  );
}
