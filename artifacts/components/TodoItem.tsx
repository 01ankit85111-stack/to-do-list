import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo { id: number; task: string; createdAt: string; }

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function TodoItem({ todo, onDelete, isDeleting }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -2 }}
      className="group relative flex items-center gap-4 bg-card p-4 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <button onClick={() => onDelete(todo.id)} disabled={isDeleting}
        className={cn("flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300",
          isHovered ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground/30 text-transparent")}>
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-base text-foreground font-medium truncate group-hover:text-primary transition-colors duration-200">
          {todo.task}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{format(new Date(todo.createdAt), "MMM d, h:mm a")}</span>
        </div>
      </div>
      <button onClick={() => onDelete(todo.id)} disabled={isDeleting}
        className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        aria-label="Delete task">
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.li>
  );
}
