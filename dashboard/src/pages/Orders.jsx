import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import { Card } from "antd";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getOrders(user.id).then(setOrders);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, i) => (
          <Card key={i} title={`Order #${order._id}`} className="mb-4">
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </Card>
        ))
      )}
    </div>
  );
}
