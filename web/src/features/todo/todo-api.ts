import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateTodoValues,
  Todo,
  TodoFilter,
  UpdateTodoValues,
} from "server/src/api/types";

const LIST = "LIST";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Todo"],

  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `/todos`,
      providesTags: () => [{ type: "Todo", id: LIST }],
    }),

    createTodo: builder.mutation<Todo, CreateTodoValues>({
      query: (args) => ({
        url: `/todos`,
        method: "POST",
        body: args,
      }),
      invalidatesTags: () => [{ type: "Todo", id: LIST }],
    }),

    updateTodo: builder.mutation<
      Todo,
      { id: string; values: UpdateTodoValues }
    >({
      query: (args) => ({
        url: `/todos/${args.id}`,
        method: "PATCH",
        body: args.values,
      }),
      invalidatesTags: () => [{ type: "Todo", id: LIST }],
    }),

    updateTodos: builder.mutation<
      Todo[],
      { filter?: TodoFilter; values: UpdateTodoValues }
    >({
      query: (args) => ({
        url: `/todos`,
        method: "PATCH",
        body: args.values,
        params: args.filter,
      }),
      invalidatesTags: () => [{ type: "Todo", id: LIST }],
    }),

    deleteTodo: builder.mutation<void, { id: string }>({
      query: (args) => ({
        url: `/todos/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Todo", id: LIST }],
    }),

    deleteTodos: builder.mutation<number, { filter: TodoFilter }>({
      query: (args) => ({
        url: `/todos`,
        method: "DELETE",
        params: args.filter,
      }),
      invalidatesTags: () => [{ type: "Todo", id: LIST }],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useUpdateTodosMutation,
} = todoApi;
