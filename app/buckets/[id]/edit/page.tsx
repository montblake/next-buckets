import Form from '@/ui/components/edit-form';
import Breadcrumbs from '@/ui/components/breadcrumbs';
import { fetchBucketById, fetchUsers } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const id = params.id;
  const [users, bucket] = await Promise.all([
    fetchUsers(),
    fetchBucketById(id),
  ]);

  console.log("Found Bucket", bucket);
  if (!bucket) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Buckets', href: '/buckets' },
          {
            label: 'Edit Bucket',
            href: `/buckets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form bucket={bucket} users={users} />
    </main>
  );
}