import dayjs from "dayjs";
import { Link } from "react-router";
import { Fragment } from "react";

function OrderDetailsGrid({ order }) {
  return (
    <>
      <div className="order-details-grid">
        {order.products.map((orderProduct) => (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>

              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>

              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default OrderDetailsGrid;
