# Server/client boundary — Day 40

- Server Components: root layout, landing page, menu page, menu layout, dish detail page, checkout page.
- Client Components: cart context/provider, dish cards (because Add to cart is interactive), category bar (uses router/search params), cart page, checkout form.
- The cart is held in React client state for this exercise. It resets on a full page refresh; persistence is not implemented.
- The browser submits only dish IDs and quantities. The server looks up authoritative prices from the dish data and calculates totals itself.
- The checkout action checks for a `session` cookie. This project does not include a sign-in flow, payment processing, database persistence, or production authentication.
