import type { Options } from "@mikro-orm/core";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://postgres:postgres@localhost:5432/postgres";

const driverOptionsHeroku = {
  // https://github.com/mikro-orm/mikro-orm/issues/303#issuecomment-737342298
  // Also, make sure to set PGSSLMODE=require in Heroku.
  connection: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const config: Options = {
  type: "postgresql",
  clientUrl: url,
  entities: ["./build/entities"],
  entitiesTs: ["./src/entities"],
  migrations: {
    path: "build/migrations",
    pathTs: "src/migrations",
    // https://github.com/mikro-orm/mikro-orm/issues/1842#issuecomment-845072313
    disableForeignKeys: false,
  },
  driverOptions:
    process.env["NODE_ENV"] === "production" ? driverOptionsHeroku : {},
};

export default config;
