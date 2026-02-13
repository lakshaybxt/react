import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { useState, useEffect, Fragment } from "react";
import Header from "../../components/Header";
import "./OrderPage.css";
import "../styles/general.css";
import { Link } from "react-router";

function OrderPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="images/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                  </div>

                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderProduct) => (
                  <Fragment key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product.name}
                      </div>

                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                          "MMMM D",
                        )}
                      </div>

                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>
                    </div>

                    <div className="product-actions">
                      <Link to="/tracking">
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderPage;
