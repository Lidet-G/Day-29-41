import "./globals.css";
import { CartProvider } from "./components/CartProvider";

export const metadata = {
  title: "ElectroHub | Electronics Store",
  description:
    "Discover useful electronics and accessories at ElectroHub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
