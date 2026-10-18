export async function loadDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error("Could not load the menu");
  }

  const dishes = await res.json();

  if (category === "All") {
    return dishes;
  }

  return dishes.filter(d => d.category === category);
}