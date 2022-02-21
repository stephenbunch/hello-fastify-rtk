import type { FastifyPluginAsync } from "fastify";
import { createTodo } from "./todo/createTodo";
import { deleteTodo } from "./todo/deleteTodo";
import { deleteTodos } from "./todo/deleteTodos";
import { getTodos } from "./todo/getTodos";
import { updateTodo } from "./todo/updateTodo";
import { updateTodos } from "./todo/updateTodos";

export const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(createTodo);
  fastify.register(deleteTodo);
  fastify.register(deleteTodos);
  fastify.register(getTodos);
  fastify.register(updateTodo);
  fastify.register(updateTodos);
};
