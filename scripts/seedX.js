const { sql } = require('@vercel/postgres');
const {
  users,
  lists,
  items
} = require('../app/lib/placeholder-data.ts');


async function dropTable() {
  try {
    await sql`TRUNCATE items`

    return {
      ok: true,
    };
  } catch (error) {
    console.error('Error dropping table:', error);
    throw new Error(`Error dropping tables: ${error}`);
  }
}

async function main() {
  dropTable();
  // dropTable('invoices');
  // dropTable('revenue');
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});