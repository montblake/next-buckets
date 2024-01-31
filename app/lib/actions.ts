"use server"

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
});

const CreateBucket = FormSchema.omit({ id: true });
const UpdateBucket = FormSchema.omit({ id: true });


export async function createBucket(formData: FormData) {
  const { user_id, title, description } = CreateBucket.parse({
    user_id: formData.get('user_id'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  await sql`
  INSERT INTO lists (user_id, title, description)
  VALUES (${user_id}, ${title}, ${description})
  `;

  revalidatePath('/buckets');
  redirect('/buckets');
}

export async function updateBucket(id: string, formData: FormData) {
  const { user_id, title, description } = UpdateBucket.parse({
    user_id: formData.get('user_id'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  await sql`
    UPDATE lists
    SET user_id = ${user_id}, title = ${title}, description = ${description}
    WHERE id = ${id}
  `;

  revalidatePath('/buckets');
  redirect('/buckets')
}

export async function deleteBucket(id: string) {
  await sql`DELETE FROM lists WHERE id = ${id}`;
  revalidatePath('/buckets');
}