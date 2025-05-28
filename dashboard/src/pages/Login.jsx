import { Form, Input, Button, Card, Row, Col } from "antd";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./login.css"; // Make sure to import your styles

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await login(values);

      const token = response.token;
      sessionStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      const userId =
        decoded.id ||
        decoded._id ||
        (decoded.user && (decoded.user.id || decoded.user._id));
      const role = decoded.role || (decoded.user && decoded.user.role);

      if (!userId || !role) {
        alert("Invalid token payload: missing user id or role");
        return;
      }

      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("user", JSON.stringify(decoded));

      if (role === "buyer") {
        navigate("/home");
      } else if (role === "seller") {
        navigate("/seller/dashboard");
      } else {
        alert("Unknown user role");
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="main">
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "#f0f4ff", // Light blue background (matches register)
        padding: "40px 0",
       
      }}
    >
      <Col xs={22} sm={16} lg={8} xl={6}>
        <Card title="Login" bordered className="login-card">
          <Form layout="vertical" onFinish={onFinish}   style={{ marginTop: "-250px" }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
    </div>
  );
}
