import fs from 'fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const importJsonTables = (filename) => {
  const json = fs.readFileSync(resolve(__dirname, filename), 'utf8');
  const data = JSON.parse(json);
  const tables = data.filter(row => row.type === 'table');

  return tables;
}

export async function up(knex) {
  
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0;');

  const gpsMockDataTables = importJsonTables('data/gps_mock_data.json');
  for (const table of gpsMockDataTables) {
    if (table.data.length) {
      await knex(table.name).insert(table.data).onConflict('id').ignore();
    }
  }

  await knex.raw('SET FOREIGN_KEY_CHECKS = 1;');
}

export async function down(knex) {
}