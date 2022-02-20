import type { FastifyPluginAsync } from "fastify";
import { getTodos } from "./todo/getTodos";

export const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(getTodos);
};
