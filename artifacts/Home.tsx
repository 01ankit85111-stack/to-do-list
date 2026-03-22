import { useTodosList, useAddTodo, useRemoveTodo } from "@/hooks/use-todos";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ListTodo, Sparkles } from "lucide-react";

export default function Home() {
  const { data: todos, isLoading, isError } = useTodosList();
  const { mutate: addTodo, isPending: isAdding } = useAddTodo();
  const { mutate: removeTodo, isPending: isRemoving } = useRemoveTodo();

  const handleAdd = (task: string) => addTodo({ data: { task } });
  const handleDelete = (id: number) => removeTodo({ id });

  const hasTodos = todos && todos.length > 0;
  const sortedTodos = todos
    ? [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pt-24 min-h-screen flex flex-col">
        <header className="mb-10 text-center md:text-left space-y-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Focus on what matters</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Your Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">Tasks</span>
          </motion.h1>
        </header>

        <div className="mb-10 sticky top-4 z-20">
          <TodoInput onAdd={handleAdd} isPending={isAdding} />
        </div>

        <div className="flex-1 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <ListTodo className="w-8 h-8 text-destructive mb-4" />
              <p className="text-muted-foreground">Could not load tasks. Please try again.</p>
            </div>
          ) : !hasTodos ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3">All caught up!</h3>
              <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                You have no pending tasks. Add one above to get started.
              </p>
            </motion.div>
          ) : (
            <ul className="space-y-3 pb-20">
              <AnimatePresence mode="popLayout">
                {sortedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} isDeleting={isRemoving} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
