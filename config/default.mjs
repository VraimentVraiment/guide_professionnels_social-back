export default {
  /**
   * Urls
   */
  HOST: "0.0.0.0",
  PORT: 8055,
  PUBLIC_URL: "http://0.0.0.0:8055",
  USER_INVITE_URL_ALLOW_LIST: "http://0.0.0.0:8055/",
  PASSWORD_RESET_URL_ALLOW_LIST: "http://localhost:3000/auth",
  /**
   * Database
   */
  DB_CLIENT: "mysql",
  DB_HOST: "127.0.0.1",
  DB_PORT: "3306",
  DB_USER: "root",
  DB_PASSWORD: "",
  /**
   * Emails
   */
  EMAIL_FROM: "no-reply@directus.io",
  EMAIL_TRANSPORT: "sendmail",
  EMAIL_SENDMAIL_NEW_LINE: "unix",
  EMAIL_SENDMAIL_PATH: "/usr/sbin/sendmail",
  EMAIL_VERIFY_SETUP: true,
  /**
   * Paths
   */
  STORAGE_LOCAL_ROOT: "./uploads",
  EXTENSIONS_PATH: "./extensions",
  /**
   * Cookies
   */
  ACCESS_TOKEN_TTL: "15m",
  REFRESH_TOKEN_TTL: "7d",
  /**
   * Cors
   */
  CORS_ENABLED: true,
  CORS_ORIGIN: true,
  CORS_METHODS: "GET,POST,PATCH,DELETE",
  CORS_ALLOWED_HEADERS: "Content-Type,Authorization",
  CORS_EXPOSED_HEADERS: "Content-Range",
  /**
   * Misc
   */
  TELEMETRY: false,
};
