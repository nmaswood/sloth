import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import * as F from "fp-ts/function";

export type Configuration = t.TypeOf<typeof Configuration>;

export const Configuration = t.type({
  port: t.string,
  host: t.string,
});

export const CONFIGURATION = F.pipe(
  Configuration.decode({
    port: process.env.PORT ?? "8085",
    host: process.env.HOST ?? "0.0.0.0",
  }),
  E.getOrElseW((e) => {
    throw new Error(`env variable not present: ${JSON.stringify(e, null, 2)}`);
  })
);
