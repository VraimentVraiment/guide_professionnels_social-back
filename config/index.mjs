import fs from 'fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONFIG_FILENAMES = [
  "default.mjs",
  "secrets.mjs",
  "local.mjs",
  "qualification.mjs",
  "production.mjs",
];

export default async env => await mergeConfigs(CONFIG_FILENAMES, env);

async function mergeConfigs(configFilenames) {

  const __dirname = dirname(fileURLToPath(import.meta.url));

  let config = {}

  for (const configFilename of configFilenames) {
    const configPath = resolve(__dirname, configFilename);
    if (fs.existsSync(configPath)) {
      config = {
        ...config,
        ...(await import(configPath)).default,
      };
    }
  }
  
  if (config.INITIAL_ADMIN_PASSWORD) {
    config.ADMIN_PASSWORD = config.INITIAL_ADMIN_PASSWORD;
    delete config.INITIAL_ADMIN_PASSWORD;
  }

  return config;
}
