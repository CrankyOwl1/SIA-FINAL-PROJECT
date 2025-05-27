import { useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { Card } from "antd";

export default function Cart() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getCart(user.id).then(setItems);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          items.map((item, i) => (
            <Card key={i} title={item.name} bordered>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
