// import Search from '@/ui/components/search';
import { CreateBucket } from '@/ui/components/buttons';
import { ModeToggle } from '@/ui/components/mode-toggle';
import { signOut } from '@/../auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function BucketsHeader() {
  return (
    <div
      className="flex flex-row items-center justify-center gap-4"
    >


      <h1 className="text-[48px] font-bold">buckets</h1>

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      <CreateBucket />


    </div >
  );
}
