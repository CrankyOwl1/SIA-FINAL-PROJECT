import { Layout, Card, Typography, Descriptions } from "antd";
import SellerHeader from "../components/SellerHeader";
import { useEffect, useState } from "react";
import { getUserById } from "../api/auth";

const { Content } = Layout;
const { Title } = Typography;

export default function SellerProfile() {
  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    email: "",
    store: "Not yet specified",
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    if (userId && token) {
      getUserById(userId, token)
        .then((data) => {
          setSellerInfo({
            name: data.name,
            email: data.email,
            store: data.store || "Not yet specified",
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
        });
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", width: "198vh" }}>
      <SellerHeader />
      <Content style={{ padding: "24px" }}>
        <Card>
          <Title level={3}>Seller Profile</Title>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{sellerInfo.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{sellerInfo.email}</Descriptions.Item>
            <Descriptions.Item label="Store">{sellerInfo.store}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
}
