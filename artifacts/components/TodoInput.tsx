import { useState, useRef, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoInputProps {
  onAdd: (task: string) => void;
  isPending: boolean;
}

export function TodoInput({ onAdd, isPending }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (trimmed && !isPending) {
      onAdd(trimmed);
      setTask("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit}
      className={cn("relative flex items-center w-full bg-card rounded-2xl border-2 transition-all duration-300",
        isFocused ? "border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]" : "border-border shadow-sm")}>
      <div className="absolute left-4 text-muted-foreground pointer-events-none">
        {isPending ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Plus className="w-5 h-5" />}
      </div>
      <input ref={inputRef} type="text" value={task} onChange={(e) => setTask(e.target.value)}
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
        placeholder="What needs to be done?" disabled={isPending}
        className="w-full py-4 pl-12 pr-24 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70 font-medium rounded-2xl" />
      <div className="absolute right-2">
        <button type="submit" disabled={!task.trim() || isPending}
          className="px-4 py-2 font-semibold text-sm rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 disabled:opacity-0 transition-all duration-200">
          Add
        </button>
      </div>
    </form>
  );
}
