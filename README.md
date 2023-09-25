# Installation

1. Clone the repo.

2. Create a database for directus to use. MySQL is the only database client that has been tested, but theoretically any database client supported by directus should work.

3. Edit the .env file to match your database configuration. You can read [https://docs.directus.io/self-hosted/config-options.html](this) for more information on directus configuration options.

Important options are:

```
# .env file

HOST="0.0.0.0" # IP or host the API listens on
PORT=8055 # The port Directus will run on

DB_CLIENT="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="your_database_name" # The database you created in step 2
DB_USER="root"
DB_PASSWORD=""

ADMIN_EMAIL="your_admin_email" # This is the first user that will be created, use it to login to the admin panel
ADMIN_PASSWORD="your_admin_password" # This is the password for the first user that will be created
```

4. Run `npm install` in the root directory.

5. Run `npm run bootstrap` in the root directory.

## Usage

1. Run `npm run start` in the root directory to start the server.

2. Admin panel is available at `http://${HOST}:${PORT}` (default: `http://0.0.0.0:8055`).

## Updating / migrating
Run `npm run migrate` in the root directory.

## License