function CategoryBar({ selected, onSelect }) {
  const cats = ["All", "Main", "Vegan", "Grill"];

  return cats.map(cat => (
    <button
      key={cat}
      className={cat === selected ? "chip on" : "chip"}
      onClick={() => onSelect(cat)}
    >
      {cat}
    </button>
  ));
}

export default CategoryBar;