import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "../../lib/format";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={520}
          height={380}
          className="product-image"
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 25vw"
        />
        {!product.available && <span className="stock-badge">Out of stock</span>}
      </Link>
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <AddToCartButton productId={product.id} disabled={!product.available} compact />
        </div>
      </div>
    </article>
  );
}
