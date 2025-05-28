import { Form, Input, Button, Card, Row, Col, Select } from "antd";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./register.css"; // Make sure the CSS is properly imported

const { Option } = Select;

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await register(values);
      alert("Registered!");
      navigate("/login");
    } catch {
      alert("Failed");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "#f0f4ff", // matches .ant-layout
        padding: "40px 0",
        margin: 0,
      }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card title="Register" bordered className="register-card">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
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

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select a role">
                <Option value="buyer">Buyer</Option>
                <Option value="seller">Seller</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
