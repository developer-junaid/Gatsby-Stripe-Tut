import React from "react"

// Stripe
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const ServerCheckout = () => {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise
    const response = await fetch(`/.netlify/functions/checkout`) // Call Function
    const data = await response.json() // Get Data

    await stripe.redirectToCheckout({
      sessionId: data.id, // Id sent by server to connect to checkout
    })
  }

  return (
    <div>
      <div>Buy School Bag</div>
      <button onClick={redirectToCheckout}>Buy</button>
    </div>
  )
}

export default ServerCheckout
