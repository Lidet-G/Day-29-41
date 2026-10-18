# Rendering strategy — Day 40

- `/`: static-friendly landing page with specials. `revalidate = 60` allows the page to be regenerated periodically.
- `/menu`: `revalidate = 60` uses Incremental Static Regeneration (ISR). The current course data function is asynchronous local sample data; replace it with the course API/database source if required by the lecturer.
- `/menu/[id]`: `generateStaticParams()` lists known dish IDs at build time. `dynamicParams = false` prevents unknown IDs from becoming new dynamic pages.
- `/cart`: client component because quantities and the running total change through user interaction.
- `/checkout`: `dynamic = "force-dynamic"` because it reads the request's `session` cookie using `cookies()`.
- `/api/dishes` and `/api/dishes/[id]`: GET route handlers return JSON.
- `/api/orders`: POST route handler validates the session and order data before calculating a server-side total.
