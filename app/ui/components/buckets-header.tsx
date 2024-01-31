// import Search from '@/ui/components/search';
import { CreateBucket } from '@/ui/components/buttons';


export default function BucketsHeader() {
  return (
    <div
      className="flex flex-row items-center justify-center gap-4"
    >


      <h1 className="text-[48px] font-bold">buckets</h1>


      {/* <Search placeholder={"Filter buckets by term..."} /> */}
      <CreateBucket />


    </div >
  );
}
