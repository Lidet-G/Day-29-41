import ProductCatalog from "../components/ProductCatalog";
import { products } from "../../data/products";

export const metadata = {
  title: "Products | ElectroHub",
  description: "Browse electronics and accessories at ElectroHub.",
};

export default function ProductsPage() {
  return (
    <main className="page-container page-section">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">THE CATALOGUE</p>
          <h1>Explore products</h1>
          <p className="muted-text">Choose useful technology for your everyday needs.</p>
        </div>
        <span className="result-count">{products.length} products</span>
      </div>
      <ProductCatalog products={products} />
    </main>
  );
}
