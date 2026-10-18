const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Main dishes", description: "Minced beef seasoned with Ethiopian spices and butter.", price: 450 },
  { id: "shiro", name: "Shiro", category: "Vegetarian", description: "A traditional Ethiopian chickpea stew.", price: 250 },
  { id: "doro-wot", name: "Doro Wot", category: "Main dishes", description: "Spicy Ethiopian chicken stew served with injera.", price: 500 },
  { id: "tibs", name: "Tibs", category: "Main dishes", description: "Sautéed beef with onions, peppers and spices.", price: 400 },
  { id: "tej", name: "Tej", category: "Drinks", description: "Traditional Ethiopian honey drink.", price: 300 },
];

export async function getDishes() {
  return dishes;
}

export async function getDishById(id) {
  return dishes.find((dish) => dish.id === id) ?? null;
}
