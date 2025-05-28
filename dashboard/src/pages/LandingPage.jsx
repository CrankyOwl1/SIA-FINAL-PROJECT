import { Button, Card, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Add this to style consistently

const { Title, Text } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <style>
        {`
          .landing-card {
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .landing-title {
            text-align: center;
            margin-bottom: 16px;
          }
          .landing-text {
            text-align: center;
            margin-bottom: 24px;
          }
          .landing-btn {
            margin-bottom: 16px;
          }
          .landing-btn-secondary {
            background-color: #f0f4ff; // Same light blue
            color: #1890ff; // Primary color
          }
        `}
      </style>
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "#f0f4ff", // Same light blue
        padding: "2rem",
      }}
    >
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card bordered className="landing-card">
          <Title level={2} className="landing-title">
            Welcome to the Everyday Basket
          </Title>
          <Text type="secondary" className="landing-text">
            Choose your action to continue
          </Text>

          <div style={{ marginTop: 32 }}>
            <Button
              type="primary"
              block
              size="large"
              className="landing-btn"
              onClick={() => navigate("/login")}
              style={{ marginBottom: 16 }}
            >
              Login
            </Button>
            <Button
              type="default"
              block
              size="large"
              className="landing-btn-secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
    </div>
  );
}
