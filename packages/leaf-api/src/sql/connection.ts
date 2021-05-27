import { CONFIGURATION, DatabaseConfiguration } from "../config";
import { createPool } from "slonik";

export const pool = createPool(
  connectionUrlFromConfig(CONFIGURATION.databaseConfiguration)
);

function connectionUrlFromConfig({
  host,
  port,
  user,
  password,
  name,
}: DatabaseConfiguration) {
  return `postgres://${user}:${password}@${host}:${port}/${name}`;
}
