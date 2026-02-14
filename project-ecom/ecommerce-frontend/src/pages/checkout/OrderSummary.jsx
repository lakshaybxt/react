import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

function OrderSummary({ cart, setCart, deliveryOptions }) {
  
  function updateDeliveryOption(productId, deliveryOptionId) {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            deliveryOptionId: deliveryOptionId,
          };
        }
        return item;
      }),
    );
  }
  
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
           
            return (
              <div key={cartItem.productId} className="cart-item-container">
                
                <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />


                <div className="cart-item-details-grid">

                  <CartItemDetails cartItem={cartItem} />
                  
                  <DeliveryOptions
                    key={cartItem.productId} carcartItem={cartItem} deliveryOptions={deliveryOptions} updateDeliveryOption={updateDeliveryOption}/>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default OrderSummary;
