import { Form, Input, Button, Card } from "antd";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = await login(values);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Login" className="w-full max-w-sm">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Log in</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
