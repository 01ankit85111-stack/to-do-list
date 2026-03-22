import { Router } from "express";
import { db, todosTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateTodoBody, DeleteTodoParams } from "@workspace/api-zod";

const router = Router();

router.get("/todos", async (req, res) => {
  const todos = await db.select().from(todosTable).orderBy(todosTable.createdAt);
  res.json(todos);
});

router.post("/todos", async (req, res) => {
  const body = CreateTodoBody.parse(req.body);
  const [todo] = await db.insert(todosTable).values({ task: body.task }).returning();
  res.status(201).json(todo);
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = DeleteTodoParams.parse({ id: req.params.id });
  const deleted = await db.delete(todosTable).where(eq(todosTable.id, id)).returning();
  if (!deleted.length) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).send();
});

export default router;
