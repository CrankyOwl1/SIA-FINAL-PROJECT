import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Menu mode="horizontal" className="mb-4">
      <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="cart"><Link to="/cart">Cart</Link></Menu.Item>
      <Menu.Item key="orders"><Link to="/orders">Orders</Link></Menu.Item>
      <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
      <Menu.Item key="register"><Link to="/register">Register</Link></Menu.Item>
    </Menu>
  );
}
