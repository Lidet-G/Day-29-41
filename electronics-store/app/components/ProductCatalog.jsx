"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductCatalog({ products }) {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortOrder === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [products, category, searchText, sortOrder]);

  return (
    <>
      <div className="catalog-controls">
        <label className="search-field">
          <span>Search products</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Try headphones or charger"
          />
        </label>
        <label className="sort-field">
          <span>Sort by</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>

      <div className="category-list" aria-label="Filter by category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`category-chip ${category === item ? "active" : ""}`}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="catalog-result-text">
        Showing {visibleProducts.length} of {products.length} products
      </p>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setCategory("All");
              setSearchText("");
              setSortOrder("featured");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
