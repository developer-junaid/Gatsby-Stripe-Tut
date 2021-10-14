import React from "react"

// Stripe
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51JOKwTJsab2N7UO9soLJQxBBc6c8A0oZTUY86AzMCEEaffzPrd5oOrms990LkMEgepVHJGOHyAhAUfRpHWejHH1s00yeyDd2lj"
)

const StripeCheckout = () => {
  // Product
  const nikeAirJordan = {
    price: "price_1JkUFJJsab2N7UO9i1VjrU5o",
    quantity: 2,
  }

  // Checkout Options
  const checkoutOptions = {
    mode: "payment",
    lineItems: [nikeAirJordan],
    successUrl: `http://localhost:8000/`, // You can set custom page here
    cancelUrl: `http://localhost:8000/`, // ----------------
  }

  // Redirect To Checkout
  const redirectToCheckout = async () => {
    const stripe = await stripePromise
    const result = await stripe.redirectToCheckout(checkoutOptions)
  }

  // Return
  return (
    <div>
      Stripe Checkout
      <br />
      <button onClick={redirectToCheckout}>Buy Nike Air Jordan</button>
    </div>
  )
}

export default StripeCheckout
