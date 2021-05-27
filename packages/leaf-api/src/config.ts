import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import * as F from "fp-ts/function";

export type DatabaseConfiguration = t.TypeOf<typeof DatabaseConfiguration>;

export const DatabaseConfiguration = t.type({
  host: t.string,
  port: t.string,
  user: t.string,
  password: t.string,
  name: t.string,
});

export type Configuration = t.TypeOf<typeof Configuration>;

export const NodeEnv = t.keyof({
  development: null,
  test: null,
  production: null,
});

export const Configuration = t.type({
  port: t.string,
  host: t.string,
  nodeEnv: NodeEnv,
  databaseConfiguration: DatabaseConfiguration,
});

export const CONFIGURATION = F.pipe(
  Configuration.decode({
    port: process.env.PORT,
    host: process.env.HOST,
    nodeEnv: process.env.NODE_ENV,
    databaseConfiguration: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
  }),
  E.getOrElseW((e) => {
    throw new Error(`env variable not present: ${JSON.stringify(e, null, 2)}`);
  })
);
