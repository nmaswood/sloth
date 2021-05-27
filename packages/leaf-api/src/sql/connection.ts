import { createPool } from "slonik";
import { CONFIGURATION, DatabaseConfiguration } from "../config";

export const pool = createPool(
  connectionStringFromConfig(CONFIGURATION.databaseConfiguration)
);

function connectionStringFromConfig(config: DatabaseConfiguration): string {
  return undefined!;
}
