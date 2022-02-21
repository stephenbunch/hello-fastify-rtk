import { useCallback, useMemo } from "react";
import { Todo } from "server/src/api/types";
import { useUpdateTodosMutation } from "../../features/todo/todo-api";
import { Item } from "./Item";

export interface BodyProps {
  todos: Todo[];
}

export function Body(props: BodyProps) {
  const { todos } = props;

  const toggleAllChecked = useMemo(
    () => todos.filter((t) => t.completed).length === todos.length,
    [todos]
  );

  const [updateTodos] = useUpdateTodosMutation();

  const toggleAll = useCallback(async () => {
    if (toggleAllChecked) {
      await updateTodos({ input: { completed: false } });
    } else {
      await updateTodos({ input: { completed: true } });
    }
  }, [toggleAllChecked, updateTodos]);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={toggleAllChecked}
        readOnly
      />
      <label htmlFor="toggle-all" onClick={toggleAll}></label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
