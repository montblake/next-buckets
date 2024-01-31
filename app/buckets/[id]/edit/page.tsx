import Form from '@/ui/components/edit-form';
import Breadcrumbs from '@/ui/components/breadcrumbs';
import { fetchBucketById, fetchUsers } from '@/lib/data';

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