<<<<<<< HEAD
# ElectroHub — Student Electronics Store

A student e-commerce project built with Next.js App Router, React, JavaScript, and regular CSS. Product information is stored in one shared JavaScript file.

## Project scope

Customers can browse sample electronics, search and filter the catalogue, view product details, add items to a cart, update quantities, remove items, submit delivery details, and view a confirmation.

**This is a front-end demonstration project.** It does not process payments, send orders to a real business, or store information on a server. Cart and latest-order data are stored in the current browser's localStorage.

## Requirements

- Node.js supported by the installed Next.js version
- npm
- Git

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Useful scripts

```bash
npm run dev
npm run lint
npm run build
npm start
npm audit
```

Run `npm start` only after a successful production build.

## Routes

| Route | Purpose |
|---|---|
| `/` | Home page and featured products |
| `/products` | Searchable, filterable, sortable catalogue |
| `/products/[id]` | Product detail page |
| `/cart` | Cart quantities, removal and subtotal |
| `/checkout` | Validated order request form |
| `/order-success` | Confirmation for the most recently submitted order |

## Project structure

```text
app/
  components/
    AddToCartButton.jsx
    CartProvider.jsx
    ProductCard.jsx
    ProductCatalog.jsx
    SiteHeader.jsx
  cart/page.jsx
  checkout/page.jsx
  order-success/page.jsx
  products/
    [id]/page.jsx
    page.jsx
  globals.css
  layout.jsx
  not-found.jsx
  page.jsx
data/
  products.js
lib/
  format.js
public/
  products/
```

## Main design decisions

- `data/products.js` is the single source of product information.
- `ProductCard` reuses the same product fields on the home page and catalogue.
- Product detail pages use dynamic App Router segments and `notFound()` for unknown IDs.
- The shared cart context keeps cart actions consistent across pages.
- Cart totals are calculated from the product prices and quantities, not hard-coded.
- Mostly static pages remain Server Components. Components using state, browser storage, and event handlers are Client Components.
- Local product SVGs are rendered with `next/image` and explicit dimensions.
- CSS media queries adapt the layout to smaller screens.
- Checkout validates required fields and makes a local demonstration order. No payment fields exist.

## Browser storage

- `electrohub_cart`: product IDs and quantities
- `electrohub_last_order`: the most recently submitted demonstration order

This is not production storage. Browser storage can be changed or cleared by the user and should not be trusted as a secure order database.

## Environment variables

The current project does not require environment variables. If a future feature needs them, document variable names in `.env.example`, keep real credentials in an ignored local `.env.local`, and never expose secrets through `NEXT_PUBLIC_` variables.

## Test checklist

See `PERF.md` for the performance test record and `README.md` for setup. Test all routes, cart totals, invalid checkout values, empty cart behavior, unknown product IDs, mobile layout, lint, and production build before submission.
=======
# Addis Eats — Day 40 Foundations

## Requirements
- Node.js and npm
- Next.js project dependencies already installed (`next`, `react`, `react-dom`, and `zod`)

## Run locally
```powershell
npm run dev
```
Open http://localhost:3000.

## Check routes
- `/` landing page and specials
- `/menu` all dishes
- `/menu?category=vegetarian` category filtering
- `/menu/kitfo` dish detail
- `/cart` cart lines and ETB total
- `/checkout` checkout (requires a `session` cookie to submit)
- `/api/dishes` GET all dishes
- `/api/dishes/kitfo` GET one dish
- `/api/orders` POST validated order

## Build
```powershell
npm run build
```
Record the actual output from your terminal here after the build completes. Do not write a made-up build result.

## Important course-project limits
The dish list is sample data. The order is validated but not stored, and no payment is taken. A `session` cookie check is only a demonstration and is not production authentication.
>>>>>>> 9db016f3e6a4b84d30db65ea56cf8cc4f56d9f10
