import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteBucket } from '@/lib/actions';

export function CreateBucket() {
  return (
    <Link
      href="/buckets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >

      <PlusIcon className="h-5" />
    </Link>
  );
}

export function UpdateBucket({ id }: { id: string }) {
  return (
    <Link
      href={`/buckets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-4" />
    </Link >
  );
}

export function DeleteBucket({ id }: { id: string }) {
  const deleteBucketWithId = deleteBucket.bind(null, id);
  return (
    <form action={deleteBucketWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
