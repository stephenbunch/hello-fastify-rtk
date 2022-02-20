import type { FastifyPluginAsync } from "fastify";
import { createTodo } from "./todo/createTodo";
import { getTodos } from "./todo/getTodos";

export const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(getTodos);
  fastify.register(createTodo);
};
