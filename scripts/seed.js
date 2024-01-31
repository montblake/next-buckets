const { sql } = require('@vercel/postgres');
const {
  users,
  lists,
  items
} = require('../app/lib/placeholder-data.ts');
const bcrypt = require('bcrypt');

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedLists(user_id) {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS lists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255)
  );
`;

    console.log(`Created "lists" table`);

    // Insert data into the "lists" table
    const insertedLists = await Promise.all(
      lists.map(
        (list) => sql`
        INSERT INTO lists (user_id, title, description)
        VALUES (${user_id}, ${list.title}, ${list.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedLists.length} lists`);

    return {
      createTable,
      lists: insertedLists,
    };
  } catch (error) {
    console.error('Error seeding lists:', error);
    throw error;
  }
}

async function seedItems(list_id) {
  // console.log("LIST_ID in seedItems():", list_id);
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "items" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        list_id UUID NOT NULL,
        text TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT false
      );
    `;

    console.log(`Created "items" table`);

    // Insert three items into table
    const newItems = [1, 2, 3]
    const insertedItems = await Promise.all(
      newItems.map(
        (item) => sql`
        INSERT INTO items (list_id, text, done)
        VALUES (${list_id}, ${"This is a new item"}, ${false})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedItems.length} items`);

    return {
      createTable,
      items: insertedItems,
    };
  } catch (error) {
    console.error('Error seeding items:', error);
    throw error;
  }
}

async function main() {

  await seedUsers()
  const data = await sql`SELECT * FROM users`;
  const user = data.rows[0];

  await seedLists(user.id);
  const listsData = await sql`SELECT * FROM lists`;
  const lists = listsData.rows;
  lists.forEach(list => seedItems(list.id));
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});