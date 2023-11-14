import fs from 'fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const importJsonTable = (filename) => {
  const json = fs.readFileSync(resolve(__dirname, filename), 'utf8');
  const data = JSON.parse(json);
  const table = data.find(row => row.type === 'table');

  return table;
}

export async function up(knex) {

  const rolesTable = importJsonTable('data/directus_roles.json');
  const adminRole = rolesTable.data.find(role => role.admin_access === '1');
  const otherRoles = rolesTable.data.filter(role => role.admin_access !== '1');
  await knex(rolesTable.name).insert(otherRoles).onConflict('id').ignore();
  const { id, ...adminRoleData } = adminRole;
  await knex(rolesTable.name).update(adminRoleData).where({ admin_access: '1' });

  const permissionsTable = importJsonTable('data/directus_permissions.json');
  await knex(permissionsTable.name).insert(permissionsTable.data).onConflict('id').ignore();

  const foldersTable = importJsonTable('data/directus_folders.json');
  await knex(foldersTable.name).insert(foldersTable.data).onConflict('id').ignore();

  await knex.raw('SET FOREIGN_KEY_CHECKS = 0;');

  const filesTable = importJsonTable('data/directus_files.json');
  await knex(filesTable.name).insert(filesTable.data).onConflict('id').ignore();
  const settingsTable = importJsonTable('data/directus_settings.json');
  await knex(settingsTable.name).insert(settingsTable.data).onConflict('id').ignore();

  await knex.raw('SET FOREIGN_KEY_CHECKS = 1;');
}

export async function down(knex) {
}