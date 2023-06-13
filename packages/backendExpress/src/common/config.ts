import { config as dotenvConfig } from "dotenv";
if (process.env.NODE_ENV !== "test") {
  dotenvConfig();
}

const getRequiredEnvVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable ${name}`);
    process.exit(1);
  }
  return value;
};

export const config = {
  db: {
    dialect: "postgres",
    host: getRequiredEnvVar("POSTGRES_HOST"),
    port: parseInt(getRequiredEnvVar("POSTGRES_PORT")),
    username: getRequiredEnvVar("POSTGRES_USER"),
    password: getRequiredEnvVar("POSTGRES_PASSWORD"),
    database: getRequiredEnvVar("POSTGRES_DB"),
    synchronize: process.env.NODE_ENV === "developnemt" ? true : false,
  },
  port: parseInt(process.env.SERVER_PORT || "8000", 10),
};

export type ConfigType = typeof config;
