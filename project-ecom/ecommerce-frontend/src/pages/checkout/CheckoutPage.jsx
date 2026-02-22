import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import "./CheckoutPage.css";
import PaymentSummary from "./PaymentSummary";

function CheckoutPage({ cart, setCart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime'
      );
      setDeliveryOptions(response.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };
  

    fetchPaymentSummary();
  }, [cart]);


  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="images/cart-favicon.png" />

      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} setCart={setCart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
