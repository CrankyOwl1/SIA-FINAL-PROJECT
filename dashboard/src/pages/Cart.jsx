import { useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { createOrder } from "../api/orders";
import { Typography, Empty, Button, message } from "antd";
import "./cart.css";

const { Title } = Typography;

export default function Cart() {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      getCart(userId).then((data) => {
        setItems(data.items || []);
        // By default, select all items
        const allIds = new Set((data.items || []).map((item) => item.product._id));
        setCheckedItems(allIds);
      });
    }
  }, [userId]);

  // Toggle checkbox state
  const handleCheck = (productId) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Increase quantity
  const handleIncrease = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity (min 1)
  const handleDecrease = (productId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product._id === productId) {
          const newQty = item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const handleOrderSelected = async () => {
    if (!userId) {
      message.warning("Please login first");
      return;
    }

    if (checkedItems.size === 0) {
      message.info("Please select items to checkout.");
      return;
    }

    const orderItems = items
      .filter((item) => checkedItems.has(item.product._id))
      .map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

    try {
      setLoading(true);
      await createOrder({ userId, items: orderItems });
      message.success("Order placed for selected items!");
      // Remove ordered items from cart UI:
      setItems((prev) =>
        prev.filter((item) => !checkedItems.has(item.product._id))
      );
      setCheckedItems(new Set()); // reset checked items
    } catch (err) {
      console.error(err);
      message.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate subtotal for checked items only
  const subtotal = items.reduce((sum, item) => {
    if (checkedItems.has(item.product._id)) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="main">
      <div className="cart-container">
        <Title level={2} className="cart-title">
          Shopping Cart
        </Title>

        {items.length === 0 ? (
          <Empty description="No items in cart." />
        ) : (
          <>
            {items.map((item) => (
              <div className="cart-item" key={item.product._id}>
                <div className="cart-item-header">
                  <input
                    type="checkbox"
                    checked={checkedItems.has(item.product._id)}
                    onChange={() => handleCheck(item.product._id)}
                  />
                  <span className="shop-name">everyday basket</span>
                </div>

                <div className="cart-item-body">
                  <img
                    src={item.product.image || "https://via.placeholder.com/80"}
                    alt={item.product.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <div className="product-name">{item.product.name}</div>
                    <div className="variation">Variation: Default</div>
                    <div className="price-row">
                      <span className="discounted-price">
                        ₱{item.product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrease(item.product._id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.product._id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="checkout-bar">
              <span className="subtotal">SubTotal: ₱{subtotal.toFixed(2)}</span>
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={handleOrderSelected}
                disabled={checkedItems.size === 0}
                className="cart-order-btn"
              >
                Check Out ({checkedItems.size})
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
  