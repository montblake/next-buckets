import { Plus } from 'lucide-react';
import { Input } from '@/ui/components/ui/input';

interface HeaderProps {
  onCreateList: () => void;
  filterTerm: string;
  setFilterTerm: (e) => void;
}

export default function BucketsHeader({
  onCreateList,
  filterTerm,
  setFilterTerm,
}: HeaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center"
    >
      <div className="relative m-8">

        <h1 className="text-[48px] font-bold">buckets</h1>
        <button
          onClick={onCreateList}
          className="absolute right-[-1.5rem] top-[.75rem] rounded-full bg-stone-800 text-stone-50"
        >
          <Plus strokeWidth="3" className="h-6 w-6" />
        </button>
      </div>


      <Input
        type="text"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        placeholder="Filter by ..."
        className="w-[400px]"
      />



    </div >
  );
}
