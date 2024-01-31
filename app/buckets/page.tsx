<<<<<<< HEAD
import Buckets from '@/ui/components/buckets-reducer';
=======
import Buckets from '@/ui/components/buckets';
import { Suspense } from 'react';
import Pagination from '@/ui/components/pagination';
import { BucketsSkeleton } from '@/ui/components/skeletons';
import { fetchBucketsPages } from '@/lib/data';
import Search from '@/ui/components/search';


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchBucketsPages(query);
  console.log("TOTAL PAGES", totalPages);
>>>>>>> 77bdf12 (Working: Location of Search was the ISSUE)

export default function Page() {
  return (
    <Buckets />
  )
}