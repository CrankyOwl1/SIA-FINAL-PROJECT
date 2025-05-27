import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Card, Button } from "antd";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <Card
            key={i}
            title={product.name}
            extra={`$${product.price}`}
            className="shadow"
          >
            <p>{product.description}</p>
            <Button type="primary" className="mt-2">Add to Cart</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
