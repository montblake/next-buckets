import Form from '@/ui/components/create-form';
import Breadcrumbs from '@/ui/components/breadcrumbs';
import { fetchUsers } from '@/lib/data';

export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Buckets', href: '/buckets' },
          {
            label: 'Create Bucket',
            href: '/buckets/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}