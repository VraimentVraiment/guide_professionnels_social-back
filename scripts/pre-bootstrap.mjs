import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SECRETS_FILE = '../config/secrets.mjs';

setupSecrets();

function setupSecrets() {

  const secrets = {
    KEY: uuidv4(),
    SECRET: uuidv4(),
    INITIAL_ADMIN_PASSWORD: uuidv4(),
  };

  const secretsPath = resolve(__dirname, SECRETS_FILE);

  if (fs.existsSync(secretsPath)) {
    console.log(`Secrets file already exists: ${SECRETS_FILE}`);
  } else {
    console.log(`Creating secrets file: ${SECRETS_FILE}`);
    fs.writeFileSync(secretsPath, `export default ${JSON.stringify(secrets, null, 2)};`);
  }
}