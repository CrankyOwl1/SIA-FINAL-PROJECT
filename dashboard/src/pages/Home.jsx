import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Card, Button, Modal, Row, Col, Typography, Layout, message, InputNumber } from "antd";
import { addToCart } from "../api/cart";
import { createOrder } from "../api/orders";
import "./home.css"; // Assuming you have some styles in home.css 

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const userId = sessionStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      message.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product, qty) => {
    if (!userId) {
      message.warning("Please login first");
      return;
    }
    try {
      await addToCart({
        userId: userId,
        productId: product._id,
        quantity: qty,
      });
      message.success(`Added "${product.name}" (x${qty}) to cart`);
    } catch {
      message.error("Failed to add to cart");
    }
  };

  const handleOrderNow = async (product, qty) => {
    if (!userId) {
      message.warning("Please login first");
      return;
    }
    try {
      await createOrder({
        userId: userId,
        items: [{ productId: product._id, quantity: qty }],
      });
      message.success(`Order placed for "${product.name}" (x${qty})`);
    } catch {
      message.error("Failed to place order");
    }
  };

  // Styles to make cards equal height and consistent layout
  const cardStyle = {
    height: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const descriptionStyle = {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    marginBottom: 16,
  };

  return (
    <div className="home-background"> 
    <Layout style={{ minHeight: "100vh", width: "207vh" }}>
      <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}>
          Shop Products
        </Title>
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={product.name}
                bordered
                hoverable
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1);
                }}
                extra={<span style={{ color: "#52c41a", fontWeight: "bold" }}>${product.price}</span>}
                style={cardStyle}
              >
                <p style={descriptionStyle}>{product.description}</p>
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setQuantity(1);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title={selectedProduct?.name}
          open={!!selectedProduct}
          onCancel={() => setSelectedProduct(null)}
          footer={[
            <Button
              key="cart"
              type="primary"
              onClick={() => {
                handleAddToCart(selectedProduct, quantity);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </Button>,
            <Button
              key="order"
              danger
              onClick={() => {
                handleOrderNow(selectedProduct, quantity);
                setSelectedProduct(null);
              }}
            >
              Order Now
            </Button>,
          ]}
        >
          <p>
            <strong>Price:</strong> ${selectedProduct?.price}
          </p>
          <p>
            <strong>Description:</strong> {selectedProduct?.description}
          </p>
          <p>
            <strong>Quantity:</strong>{" "}
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value)}
              style={{ width: 80 }}
            />
          </p>
        </Modal>
      </Content>
    </Layout>
    </div>
  );
}
