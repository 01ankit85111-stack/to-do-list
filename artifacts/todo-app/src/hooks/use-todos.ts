import { useQueryClient } from "@tanstack/react-query";
import { useGetTodos, useCreateTodo, useDeleteTodo, getGetTodosQueryKey } from "@workspace/api-client-react";

export function useTodosList() {
  return useGetTodos();
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useCreateTodo({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() }),
    },
  });
}

export function useRemoveTodo() {
  const queryClient = useQueryClient();
  return useDeleteTodo({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() }),
    },
  });
}
