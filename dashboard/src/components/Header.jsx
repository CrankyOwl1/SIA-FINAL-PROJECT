// src/components/Header.jsx
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header: AntHeader } = Layout;

export default function Header() {
  const location = useLocation();

  const menuItems = [
    { key: "/home", label: <Link to="/home">Home</Link> },
    { key: "/cart", label: <Link to="/cart">Cart</Link> },
    { key: "/orders", label: <Link to="/orders">Orders</Link> },
    { key: "/", label: <Link to="/">Log out</Link> }
  ];

  return (
    <AntHeader
      style={{
        backgroundColor: "#001f4d", // darker navy background
        boxShadow: "0 2px 8px rgba(0, 31, 77, 0.3)", // soft shadow matching card
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        zIndex: 1000,
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ flex: "0 0 auto", fontSize: 20, fontWeight: "bold", color: "#ffffff" }}>
        <Link to="/" style={{ color: "#ffffff", fontFamily: "Comic Sans MS" }}>
          Everyday Basket
        </Link>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          borderBottom: "none",
          display: "flex",
          color: "#ffffff",
        }}
        theme="dark" // sets text color to white
      />
    </AntHeader>
  );
}
