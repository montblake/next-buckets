"use client"

import { UserField } from '@/lib/definitions';
import Link from 'next/link';
import { Button } from '@/ui/components/button';
import { createBucket } from '@/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ users }: { users: UserField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBucket, initialState);
  console.log("STATE", state);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose user
          </label>
          <div className="relative">
            <select
              id="user_id"
              name="user_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='user-error'
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div id="user-error" aria-live="polite" aria-atomic="true">
            {state.errors?.user_id &&
              state.errors.user_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Bucket Title */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="mt-2 rounded-md">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter bucket title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="title-error"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        {/* Bucket Description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="mt-2 rounded-md">
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter more details"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="description-error"
            />
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message &&
            <p className="mt-2 text-sm text-red-500">
              {state.message}
            </p>
          }
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/buckets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Bucket</Button>
      </div>
    </form>
  );
}
