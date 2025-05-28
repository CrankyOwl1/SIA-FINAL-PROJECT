// src/components/SellerHeader.jsx
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

export default function SellerHeader() {
  const location = useLocation();

  const menuItems = [
    { key: "/seller/dashboard", label: <Link to="/seller/dashboard">Home</Link> },
    // { key: "/seller/profile", label: <Link to="/seller/profile">Profile</Link> },
    { key: "/products", label: <Link to="/products">Product Management</Link> },
     { key: "/", label: <Link to="/">Log out</Link> }
    
  ];

  return (
    <Header
      style={{
        backgroundColor: "#001529",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
        Seller Panel
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ backgroundColor: "transparent" }}
      />
    </Header>
  );
}
