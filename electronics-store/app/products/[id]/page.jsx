import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import { formatPrice } from "../../../lib/format";
import AddToCartButton from "../../components/AddToCartButton";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) return { title: "Product not found | ElectroHub" };
  return {
    title: `${product.name} | ElectroHub`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) notFound();

  return (
    <main className="page-container page-section">
      <p className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.name}
      </p>

      <section className="product-detail">
        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            priority
            sizes="(max-width: 760px) 90vw, 50vw"
          />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <p className={product.available ? "availability available" : "availability unavailable"}>
            <span aria-hidden="true">●</span>{" "}
            {product.available ? "Available to order" : "Currently unavailable"}
          </p>
          <AddToCartButton productId={product.id} disabled={!product.available} />
          <p className="small-note">Sample product listing for this student project.</p>
          <Link className="text-link detail-back-link" href="/products">
            ← Back to all products
          </Link>
        </div>
      </section>
    </main>
  );
}
