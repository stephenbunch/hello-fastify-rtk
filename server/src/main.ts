import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifySwagger from "fastify-swagger";
import path from "path";
import { api } from "./api";
import { fastifyMikroOrm } from "./plugins/mikro-orm";

async function main() {
  const server = fastify();

  server.register(fastifyStatic, {
    root: path.resolve(path.join(__dirname, "../../web/build")),
  });

  server.register(fastifySwagger, {
    routePrefix: "/openapi",
    exposeRoute: true,
  });

  server.register(fastifyMikroOrm);

  server.get("/health", (req, res) => {
    res.send("ok");
  });

  server.register(api, { prefix: "/api" });

  // https://github.com/fastify/fastify/issues/709#issuecomment-360146491
  const host =
    process.env["NODE_ENV"] !== "production" ? "localhost" : "0.0.0.0";
  const port = parseInt(process.env["PORT"] || "8000");
  const address = await server.listen(port, host);

  console.log(`🚀 Server ready at ${address}`);
}

main();
