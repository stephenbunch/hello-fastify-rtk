import { EntityManager, MikroORM } from "@mikro-orm/core";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export const fastifyMikroOrm: FastifyPluginAsync = fp(async (fastify) => {
  const orm = await MikroORM.init();

  fastify.addHook("onRequest", async (req) => {
    req.em = orm.em.fork();
  });

  fastify.addHook("onClose", async () => {
    await orm.close();
  });
});

declare module "fastify" {
  interface FastifyRequest {
    em: EntityManager;
  }
}
