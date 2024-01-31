import { ScrollArea } from '@/ui/components/ui/scroll-area';
import BucketCard from '@/ui/components/bucket-card';
import { fetchFilteredBuckets } from '@/lib/data';


export default async function Buckets({ query, currentPage }: {
  query: string;
  currentPage: number;
}) {
  const buckets = await fetchFilteredBuckets(query, currentPage);
  console.log("Bucks", buckets);

  return (
    <div className="overflow-scroll h-3/4">
      <ScrollArea>
        <div className="flex flex-col items-center justify-start space-y-6 pb-24">
          {buckets.map((bucket) => (
            <BucketCard
              key={bucket.id}
              bucket={bucket}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
