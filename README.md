# To-Do List App

A full-stack to-do list web application where you can add, view, and delete tasks. All tasks are saved to a PostgreSQL database so they persist across sessions.

![To-Do List App](public/images/bg-mesh.png)

## Features

- Add tasks using the input bar or keyboard shortcut (`⌘K` / `Ctrl+K`)
- Delete tasks by clicking the checkmark or the trash icon
- Tasks show the date and time they were created
- Smooth animations when adding and removing tasks
- "All caught up" empty state when task list is clear
- Fully responsive — works on mobile and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion |
| Data Fetching | TanStack React Query |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL, Drizzle ORM |
| API Contract | OpenAPI 3.1, Orval (codegen) |
| Package Manager | pnpm (monorepo) |

## Project Structure
