// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} w-[400px] bg-gray-100 rounded-xl p-2 shadow-sm`}
    >
      <div className="flex flex-col p-4 w-full bg-gray-50 rounded-xl gap-2 mb-2">
        <div className="h-8 w-full rounded-md bg-gray-200" />
        <div className="h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex flex-col w-full bg-gray-50 rounded-xl">
        <div className="flex p-4 w-full rounded-xl gap-2">
          <div className="h-8 w-16 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="h-8 flex-grow rounded-md bg-gray-200" />
        </div>
        <div className="flex p-4 w-full bg-gray-50 rounded-xl gap-2">
          <div className="h-8 w-16 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="h-8 flex-grow rounded-md bg-gray-200" />
        </div>
        <div className="flex p-4 w-full bg-gray-50 rounded-xl gap-2">
          <div className="h-8 w-16 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="h-8 flex-grow rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}


export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}


export function BucketSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function BucketsSkeleton() {
  return <div>
    <BucketSkeleton />
    <BucketSkeleton />
    <BucketSkeleton />
  </div>
}


export function ItemSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function ItemsSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
