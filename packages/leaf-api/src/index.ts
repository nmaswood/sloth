import * as _ from "@sloth/precedent-iso";

import fastify from "fastify";

import * as C from "./config";

const server = fastify();

server.get("/", async () => "OKAY");

server.listen(C.CONFIGURATION.port, C.CONFIGURATION.host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server listening at ${address}`);
});
