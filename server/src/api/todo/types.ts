import { Static, Type } from "@sinclair/typebox";

export const TodoType = Type.Object({
  id: Type.String(),
  description: Type.String(),
  completed: Type.Boolean(),
});

export const CreateTodoValuesType = Type.Intersect([
  Type.Pick(Type.Partial(TodoType), ["completed"]),
  Type.Omit(TodoType, ["id", "completed"]),
]);

export const UpdateTodoValuesType = Type.Partial(Type.Omit(TodoType, ["id"]));

export const TodoFilterType = Type.Object({
  completed: Type.Optional(Type.Boolean()),
});

export type Todo = Static<typeof TodoType>;

export type CreateTodoValues = Static<typeof CreateTodoValuesType>;

export type UpdateTodoValues = Static<typeof UpdateTodoValuesType>;

export type TodoFilter = Static<typeof TodoFilterType>;
