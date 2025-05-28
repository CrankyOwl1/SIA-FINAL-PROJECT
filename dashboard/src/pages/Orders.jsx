import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import { Typography, Table, Empty } from "antd";
import "./orders.css";

const { Title } = Typography;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getOrders(userId)
        .then((data) => setOrders(data || []))
        .catch(() => setOrders([]));
    }
  }, [userId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Items",
      key: "totalItems",
      render: (_, record) =>
        record.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    },
  ];

  return (
    <div className="main">
    <div className="orders-container">
      <Title level={2} className="orders-title">
        Your Orders
      </Title>

      {orders.length === 0 ? (
        <Empty description="No orders found." className="orders-empty" />
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
          bordered={false}
          scroll={{ x: "max-content" }}
          className="orders-table"
        />
      )}
    </div>
    </div>
  );
}
