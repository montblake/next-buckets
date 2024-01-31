import { sql } from '@vercel/postgres';
import { User, UserField, List, Item } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { QueryResultRow } from '@vercel/postgres';

export async function fetchLists() {
  noStore();
  try {



    const data = await sql`SELECT * FROM lists`;
    // const lists: List[] = data.rows.map((row: QueryResultRow) => ({
    //   id: row.id,
    //   user_id: row.user_id,
    //   title: row.title,
    //   description: row.description,
    // }));
    // console.log("ROWS", rows)
    const lists: List[] = data.rows.map((row: QueryResultRow) => ({
      id: row.id,
      user_id: row.user_id,
      title: row.title,
      description: row.description,
    }));

    await new Promise(resolve => setTimeout(resolve, 3000));

    return lists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists data.');
  }
}

export async function fetchBucketById(id: string) {
  noStore();
  try {
    const data = await sql`SELECT * FROM lists WHERE lists.id = ${id}`
    // const bucket: List = data.rows.map((row: QueryResultRow) => ({
    //   id: row.id,
    //   user_id: row.user_id,
    //   title: row.title,
    //   description: row.description,
    // }))[0];
    const bucket = data.rows[0] as unknown as List;
    return bucket;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bucket by id');
  }
}

export async function fetchItems() {
  noStore();
  try {
    const data = await sql`SELECT * FROM items`;
    const items: Item[] = data.rows.map((row: QueryResultRow) => ({
      id: row.id,
      list_id: row.list_id,
      text: row.text,
      done: row.done,
    }));

    await new Promise(resolve => setTimeout(resolve, 5000));

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
    const data = await sql`
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
    const buckets = data.rows as unknown as List[];
    return buckets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered buckets');
  }
}

export async function fetchBucketsPages(query: string) {
  noStore();
  try {
    const data = await sql`SELECT COUNT(*)
    FROM lists
    WHERE
      lists.title ILIKE ${`%${query}%`} OR
      lists.description ILIKE ${`%${query}%`}
    `;
    const count = data.rows[0].count;
    console.log("COUNT", count);

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
    const data = await sql`
      SELECT * FROM items
      WHERE items.list_id = ${list_id}
    `;
    const listItems = data.rows as unknown as Item[];
    return listItems;
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