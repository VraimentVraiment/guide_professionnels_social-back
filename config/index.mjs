import fs from 'fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import defaultConfig from "./default.mjs";
import secrets from "./secrets.mjs";

const { INITIAL_ADMIN_PASSWORD, ...secretConfig } = secrets;

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  ...defaultConfig,
  ...secretConfig,
  ...(
    fs.existsSync(resolve(__dirname, "production.mjs"))
      ? (await import("./production.mjs")).default
      : fs.existsSync(resolve(__dirname, "qualification.mjs"))
        ? (await import("./qualification.mjs")).default
        : fs.existsSync(resolve(__dirname, "local.mjs"))
          ? (await import("./local.mjs")).default
          : {}
  ),
};

if (INITIAL_ADMIN_PASSWORD) {
  config.ADMIN_PASSWORD = INITIAL_ADMIN_PASSWORD;
}

export default config