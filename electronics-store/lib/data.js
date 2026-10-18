
export const dishes = [
  { id: 1, name: "Doro Wat", category: "Main", price: 240 },
  { id: 2, name: "Shiro", category: "Vegetarian", price: 120 },
  { id: 3, name: "Tibs", category: "Main", price: 280 },
  { id: 4, name: "Kitfo", category: "Main", price: 300 },
  { id: 5, name: "Misir Wat", category: "Vegetarian", price: 110 },
  { id: 6, name: "Firfir", category: "Main", price: 150 },
  { id: 7, name: "Chechebsa", category: "Main", price: 130 },
  { id: 8, name: "Gomen Besiga", category: "Main", price: 220 },
  { id: 9, name: "Tej", category: "Drinks", price: 140 },
  { id: 10, name: "Dulet", category: "Main", price: 260 },
  { id: 11, name: "Beyaynet", category: "Vegetarian", price: 180 },
  { id: 12, name: "Special Tibs", category: "Main", price: 350 },
  { id: 13, name: "Coffee", category: "Drinks", price: 50 },
];

export const orders = {
  "1001": {
    id: "1001",
    customer: "Binyam",
    items: ["Doro Wat", "Shiro"],
    total: 360,
    status: "Preparing",
  },
  "1002": {
    id: "1002",
    customer: "Hana",
    items: ["Tibs"],
    total: 280,
    status: "Out for delivery",
  },
};

export function getOrder(id) {
  return orders[id] ?? null;
}

export function getDishes({
  query = "",
  page = 1,
  pageSize = 4,
} = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(normalizedQuery)
  );

  const total = filteredDishes.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    dishes: filteredDishes.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}
