import fastify from "fastify";

import * as C from "./config";
import { pool } from "./sql/connection";
import { sql } from "slonik";

const server = fastify();

server.get("/", async () =>
  pool.connect(async (c) => {
    const result = await c.query(sql`SELECT 1`);
    return result.rows[0];
  })
);

server.listen(C.CONFIGURATION.port, C.CONFIGURATION.host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server listening at ${address}`);
});
