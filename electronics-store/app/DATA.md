# Day 41 — Data Fetching with SWR

## 1. Shared fetcher

All SWR queries use `lib/fetcher.js`.

The fetcher sends a request, checks `response.ok`, and returns JSON. If the response fails, it throws an error so the component can display an error message.

## 2. Order status

**File:** `app/orders/[id]/OrderStatus.jsx`

* **Key:** `/api/orders/${id}`
* **Refresh rule:** `refreshInterval: 5000`
* **Initial data:** `fallbackData: initial`
* **Reason:** Each order ID has its own cache entry. Order status can change while the customer waits, so it is checked every five seconds. The server supplies the first order value, preventing an unnecessary loading spinner on the first paint.

## 3. Menu search

**File:** `app/menu/SearchBox.jsx`

* **Key:** `/api/dishes?q=${encodeURIComponent(debouncedTerm)}&page=1`
* **Empty search key:** `null`
* **Refresh rule:** Revalidate when the debounced search key changes; SWR also uses its normal focus and reconnect revalidation behaviour.
* **Options:** `keepPreviousData: true`
* **Reason:** The 300 ms debounce avoids a request for every keystroke. A null key prevents a request when the search is empty. Keeping previous data avoids an empty-list flash while new results load. The search term is part of the key so different searches use different cache entries.

## 4. Paginated dish list

**File:** `app/menu/DishPagination.jsx`

* **Key:** `/api/dishes?page=${page}`
* **Refresh rule:** Revalidate when the page number changes; normal SWR focus and reconnect revalidation remain enabled.
* **Options:** `keepPreviousData: true`
* **Reason:** The page number identifies which set of dishes is requested. Including it in the key prevents different pages from sharing the wrong cached results. The previous page remains visible while the next page loads.

## 5. staleTime

This exercise uses SWR, not TanStack Query, so `staleTime` is not configured in these components. `staleTime` is a TanStack Query option from the lecture, whereas SWR uses its own revalidation settings.

## 6. Race conditions

The search uses a debounced key and SWR's cache. When the key changes, SWR tracks the request for that key rather than relying on a manually written effect to decide which response to display. `keepPreviousData` keeps the old list visible during the transition.

## 7. Testing

1. Open `/orders/1001` and confirm that the order appears immediately.
2. Open the browser Network tab and confirm that the order API is requested about every five seconds.
3. Open `/menu` and type `kitfo`. Confirm that search waits until typing pauses.
4. Clear the search box and confirm that no search request is sent for an empty term.
5. Use Next and Previous to change pages. Confirm that the URL contains `?page=2`, for example.
6. Confirm that the dish list does not flash empty while a new page loads.
