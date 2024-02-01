"use server"

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  user_id: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }).min(1, { message: 'Please enter a title.' }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }).min(1, { message: 'Please enter a description.' }),
});

const CreateBucket = FormSchema.omit({ id: true });
const UpdateBucket = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    user_id?: string[];
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};


export async function createBucket(
  prevState: State,
  formData: FormData
) {
  // validate form using Zod
  const validatedFields = CreateBucket.safeParse({
    user_id: formData.get('user_id'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // if validation fails, return erros early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("VALIDATED", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { user_id, title, description } = validatedFields.data;

  // Insert data into database
  try {
    await sql`
      INSERT INTO lists (user_id, title, description)
      VALUES (${user_id}, ${title}, ${description})
    `;
  } catch (error) {
    // if database error occurs, return a specific message
    return {
      message: 'Database Error: Failed to Create Bucket.',
    };
  }

  // revalidate the cache for the buckets page and redirect the user
  revalidatePath('/buckets');
  redirect('/buckets');
}

export async function updateBucket(
  id: string,
  prevState: State,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = UpdateBucket.safeParse({
    user_id: formData.get('user_id'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // if form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Bucket.',
    };
  }

  // Prepare data for updating list
  const { user_id, title, description } = validatedFields.data;

  // Updated list in the database
  try {
    await sql`
      UPDATE lists
      SET user_id = ${user_id}, title = ${title}, description = ${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Bucket.',
    };
  }

  revalidatePath('/buckets');
  redirect('/buckets')
}

export async function deleteBucket(id: string) {
  try {
    await sql`DELETE FROM lists WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
  revalidatePath('/buckets');
}