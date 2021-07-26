import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HvmuhCefqa64yPRzVTs7RcryYfwBvoT7GwQ2tZrNA7LdeZI3Lhte1tysdFqpjEjW5oytB2rdJbIWO9XgrY9OdBh00mTGlAekx";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Ecommerce Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      stripeKey={publishableKey}
      panelLabel="Pay Now"
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
