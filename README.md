# Host & Home Cleaners Website

This is a [Next.js](https://nextjs.org/) project.

## Features

Uses the following tech stack:

### Frontend

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Component Libraries

- [Shadcn/UI](https://ui.shadcn.com/)
- [Flowbite](https://flowbite.com/)

## Notes

- `lib/` folder is utility functions, globals, custom hooks, helpers, etc.
- `components/` folder is for components that are used across the app.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Constitution

This document defines the stable rules, structure, and conventions for the Host and Home Cleaners Website project.

### Project Type

- Next.js app router project

### Directory Structure

- Main source code is in the `src/` directory.
- Components are in `src/components/` unless from shadcn/ui, which go in `src/components/ui/`.
- Public assets are in `public/`.

### Naming Conventions

- Component files use PascalCase.
- Use absolute path imports over relative imports where possible.

### Styling

- Use Tailwind CSS only. No inline CSS or other styling libraries.

### Package Management

- Use bun as the default package manager.

### Testing

- Use Vitest for testing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
