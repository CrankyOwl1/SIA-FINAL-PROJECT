// src/pages/SellerPage.jsx
import { Layout, Typography } from "antd";
import SellerHeader from "../components/SellerHeader";

const { Content } = Layout;
const { Title } = Typography;

export default function SellerPage() {
  return (
    <Layout style={{ minHeight: "100vh", width: "210vh" }}>
      <SellerHeader />
      <Content style={{ padding: "24px" }}>
        <Title level={2}>Welcome, Seller!</Title>
        <p>Manage your products, view sales, and update your profile here.</p>
      </Content>
    </Layout>
  );
}
