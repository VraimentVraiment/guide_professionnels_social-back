# Installation

1. Clone the repo.

2. Create a database for directus to use. MySQL is the only database client that has been tested, but theoretically any database client supported by directus should work.

3. Edit the config/default.mjs file to match your database configuration. You can read [https://docs.directus.io/self-hosted/config-options.html](this) for more information on directus configuration options. You can also override any configuration option by creating a config/production.mjs file (see below).

4. (Optional) If you wan't to use several configurations based on environnement (local development, qualification, production), you can create some .mjs files that will be merged to config/default.mjs based on this priority order:

- config/production.mjs
- config/qualification.mjs
- config/local.mjs

Those files should contain only the properties you want to override from default.mjs. For example, if you want to override the database configuration in production environnement, you can create a file name config/production.mjs only in this environnement with the following content:

```js
// config/production.mjs
export default {
  DB_HOST: "<your production database host>",
  DB_DATABASE: "<your production database name>",
  ...
}
```

5. Run `npm install` in the root directory.

6. Run `npm run bootstrap` in the root directory.

A file named config/secrets.mjs will be created. This file contains the intial admin password for the default user "admin@example.com" to use to log into directus. You cannot change this password by editing this file, you have to change it from directus admin panel.

## Usage

1. Run `npm run start` in the root directory to start the server.

2. Admin panel is available at `http://${HOST}:${PORT}` (default: `http://0.0.0.0:8055`).

3. After installation, you can log into directus admin panel with the default user "admin@example.com" and the password shown in config/secrets.mjs. You should change this password as soon as possible.

## Updating

### Migrating database

Run `npm run migrate:latest` in the root directory.

### Migrating schema

Run `snapshot:apply` in the root directory.

## License