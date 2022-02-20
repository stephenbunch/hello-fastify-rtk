import { Static, Type } from "@sinclair/typebox";

export const TodoSchema = Type.Object({
  id: Type.String(),
  description: Type.String(),
  completed: Type.Boolean(),
});

export type Todo = Static<typeof TodoSchema>;
