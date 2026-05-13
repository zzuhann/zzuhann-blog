---
name: "senior-frontend"
description: Frontend development skill for React, Next.js, TypeScript, and Tailwind CSS applications. Use when building React components, optimizing Next.js performance, analyzing bundle sizes, scaffolding frontend projects, implementing accessibility, or reviewing frontend code quality. Also covers Node.js/Express backend patterns for full-stack work.
---

# Senior Frontend

Frontend development patterns, code review suggestions, and senior-level guidance for the user's actual tech stack.

## Your Tech Stack

### Blog (zzuhann-blog)
- **Framework**: Next.js 16, App Router, Server Components by default
- **Styling**: Tailwind 4 — uses CSS `@theme` in `app/globals.css`, **no** `tailwind.config.ts`
- **CMS**: Sanity — all data fetching through `lib/sanity/`, on-demand revalidation via webhook
- **TypeScript**: strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`
- **Package manager**: pnpm
- **Fonts**: Noto Serif TC (serif), Noto Sans TC (sans), EB Garamond (latin-italic), JetBrains Mono (mono)
- **Theme**: Light-only, editorial print aesthetic — no dark mode

### Stellar (full-stack)
- **Backend**: Node.js + Express 5, TypeScript
- **Database**: Firestore (firebase-admin), all reads/writes wrapped with `withTimeoutAndRetry`
- **Auth**: Firebase Auth ID Token + `authenticateToken` middleware
- **Structure**: routes → controllers → services (three-layer), Zod validation
- **Deploy**: Zeabur

---

## Default Behavior

When invoked:
1. **Read** the relevant file(s) first — don't assume structure
2. **Suggest** changes with clear before/after, explain *why* this is the senior approach
3. **Write** the actual code — don't give pseudocode or vague directions
4. Flag potential issues even if not asked (TypeScript strictness, performance, a11y)

---

## Next.js Patterns (App Router)

### Server vs Client Components

Use Server Components by default. Add `'use client'` only when needed:
- Event handlers (`onClick`, `onChange`)
- State (`useState`, `useReducer`)
- Effects (`useEffect`)
- Browser APIs

```tsx
// Server Component (default) — no 'use client'
async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);  // lib/sanity/ call
  return (
    <article>
      <PostHeader post={post} />
      <ShareButton slug={params.slug} />  {/* client component */}
    </article>
  );
}
```

### Sanity Data Fetching

All queries go through `lib/sanity/`. Never call `getClient()` directly from a component.

```ts
// lib/sanity/queries.ts
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, publishedAt, body, "slug": slug.current
  }
`;

// lib/sanity/fetch.ts
export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(POST_BY_SLUG_QUERY, { slug });
}
```

### Revalidation

Use on-demand revalidation (webhook), not time-based. `/api/revalidate` should cover all affected paths:

```ts
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  const paths = ['/', '/blog', `/blog/${slug}`];
  await Promise.all(paths.map(p => revalidatePath(p)));
}
```

---

## Tailwind 4 Patterns

Tailwind 4 uses CSS `@theme` — **no** `tailwind.config.ts`. Define tokens in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-paper: oklch(97% 0.01 80);
  --color-ink: oklch(15% 0.02 250);
  --font-serif: "Noto Serif TC", Georgia, serif;
  --font-sans: "Noto Sans TC", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

Conditional classes — use `clsx` or `cn()`:

```tsx
import { clsx } from 'clsx';

<button className={clsx(
  'px-4 py-2 rounded',
  variant === 'primary' && 'bg-ink text-paper',
  disabled && 'opacity-50 cursor-not-allowed'
)} />
```

---

## TypeScript Strict Patterns

The blog uses `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`. Common patterns:

```ts
// noUncheckedIndexedAccess — always check array access
const first = items[0];         // type: Item | undefined
const safe = items[0]?.title;   // correct

// exactOptionalPropertyTypes — don't assign undefined to optional props
interface CardProps {
  subtitle?: string;  // means "absent", not "undefined"
}
// Wrong: <Card subtitle={undefined} />
// Right: {subtitle && <Card subtitle={subtitle} />}

// Prefer Pick over passing full types
function PostMeta({ post }: { post: Pick<Post, 'publishedAt' | 'author'> }) {}
```

---

## React Patterns

### Compound Components

```tsx
const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(0);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
};
Tabs.List = TabList;
Tabs.Panel = TabPanel;
```

### Custom Hooks

```tsx
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

---

## Express 5 Backend Patterns (Stellar)

Express 5 natively catches async errors — route handlers must return a Promise (don't wrap in `void`):

```ts
// Correct — returns Promise
router.get('/events', authenticateToken, async (req, res) => {
  const events = await eventService.getAll();
  res.json(events);
});

// Wrong — Express 5 can't catch errors from void-wrapped handlers
router.get('/events', authenticateToken, (req, res) => {
  void eventService.getAll().then(events => res.json(events));
});
```

Three-layer structure:

```
routes/events.ts        → request parsing, calls controller
controllers/events.ts   → orchestration logic
services/eventService.ts → Firestore reads/writes (via withTimeoutAndRetry)
```

Zod validation as middleware:

```ts
const createEventSchema = z.object({
  title: z.string().min(1),
  date: z.string().datetime(),
});

router.post('/', authenticateToken, validate(createEventSchema), eventController.create);
```

---

## Code Review Checklist

When reviewing frontend code, flag these automatically:

- [ ] `"use client"` added without a real need (event/state/browser API)
- [ ] Component exceeds 150 lines — likely needs splitting
- [ ] GROQ query defined outside `lib/sanity/`
- [ ] `any` type or `as X` cast without comment
- [ ] Array index access without null check (`arr[0]` vs `arr[0]?.x`)
- [ ] `exactOptionalPropertyTypes` violated (passing `undefined` to optional prop)
- [ ] Missing `alt` on `<img>` or `<Image>`
- [ ] `onClick` without keyboard equivalent on non-button element
- [ ] Tailwind `config.ts` pattern used (should be CSS `@theme` in v4)
- [ ] `npm` or `yarn` command suggested (use `pnpm`)

---

## Bundle Optimization

Common heavy deps and alternatives:

| Package | Size | Alternative |
|---------|------|-------------|
| moment | 290KB | date-fns (12KB) or dayjs (2KB) |
| lodash | 71KB | lodash-es with tree-shaking |
| axios | 14KB | Native fetch |
| @mui/material | Large | Radix UI + Tailwind |

---

## Resources

- React Patterns: `references/react_patterns.md`
- Next.js Optimization: `references/nextjs_optimization_guide.md`
- Best Practices: `references/frontend_best_practices.md`
