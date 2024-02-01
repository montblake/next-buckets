import { sql } from '@vercel/postgres';
import { User, UserField, List, Item } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { QueryResultRow } from '@vercel/postgres';

export async function fetchLists() {
  noStore();
  try {
    const data = await sql<List>`SELECT * FROM lists`;
    const lists = data.rows;
    return lists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch buckets data.');
  }
}

export async function fetchBucketById(id: string) {
  noStore();
  try {
    const data = await sql<List>`SELECT * FROM lists WHERE lists.id = ${id}`;
    const bucket = data.rows[0];
    return bucket;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bucket by id');
  }
}

export async function fetchItems() {
  noStore();
  try {
    const data = await sql<Item>`SELECT * FROM items`;
    const items = data.rows;
    return items;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredBuckets(
  query: string,
  currentPage: number
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<List>`
      SELECT
        lists.id,
        lists.user_id,
        lists.title,
        lists.description
      FROM lists
      WHERE
        lists.title ILIKE ${`%${query}%`} OR
        lists.description ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    const buckets = data.rows;
    return buckets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered buckets');
  }
}

export async function fetchBucketsPages(query: string) {
  noStore();
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM lists
      WHERE
        lists.title ILIKE ${`%${query}%`} OR
        lists.description ILIKE ${`%${query}%`}
    `;
    const count = data.rows[0].count;
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of relevant buckets.');
  }
}

export async function fetchBucketItems(list_id: string) {
  noStore();
  try {
    const data = await sql<Item>`
      SELECT * FROM items
      WHERE items.list_id = ${list_id}
    `;
    const bucketItems = data.rows;
    return bucketItems;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ListItems');
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;
    const users = data.rows;
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Users');
  }
}