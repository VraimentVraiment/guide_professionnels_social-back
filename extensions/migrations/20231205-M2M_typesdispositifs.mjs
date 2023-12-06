// INSERT INTO gps_fichesdispositif_gps_typesdispositif (gps_fichesdispositif_id, gps_typesdispositif_id)
// SELECT id, gps_typesdispositif_id 
// FROM gps_fichesdispositif
// WHERE NOT EXISTS (
//     SELECT 1 
//     FROM gps_fichesdispositif_gps_typesdispositif 
//     WHERE gps_fichesdispositif_id = gps_fichesdispositif.id 
//     AND gps_typesdispositif_id = gps_fichesdispositif.gps_typesdispositif_id
// );

export async function up(knex) {

  await knex.raw('SET FOREIGN_KEY_CHECKS = 0;');

  await knex.raw(`
    INSERT INTO gps_fichesdispositif_gps_typesdispositif (gps_fichesdispositif_id, gps_typesdispositif_id)
    SELECT id, gps_typesdispositif_id 
    FROM gps_fichesdispositif 
    WHERE NOT EXISTS (
        SELECT 1 
        FROM gps_fichesdispositif_gps_typesdispositif 
        WHERE gps_fichesdispositif_id = gps_fichesdispositif.id 
        AND gps_typesdispositif_id = gps_fichesdispositif.gps_typesdispositif_id
    );
  `);

  await knex.raw('SET FOREIGN_KEY_CHECKS = 1;');

}

export async function down(knex) {

  await knex.raw('SET FOREIGN_KEY_CHECKS = 0;');

  await knex.raw(`
    DELETE FROM gps_fichesdispositif_gps_typesdispositif 
    WHERE gps_fichesdispositif_id IN (
      SELECT id 
      FROM gps_fichesdispositif 
      WHERE gps_typesdispositif_id = gps_fichesdispositif_gps_typesdispositif.gps_typesdispositif_id
    );
  `);
}