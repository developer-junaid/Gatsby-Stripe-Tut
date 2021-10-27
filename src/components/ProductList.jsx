import React from "react"

// Stripe
import { loadStripe } from "@stripe/stripe-js"
import { useStaticQuery, graphql } from "gatsby"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const ProductList = () => {
  const data = useStaticQuery(
    graphql`
      query ProductDetails {
        prices: allStripePrice {
          edges {
            node {
              active
              id
              currency
              product {
                id
                description
                images
                name
                active
              }
              unit_amount
            }
          }
        }
      }
    `
  )

  // Checkout Function
  const redirectToCheckout = async priceId => {
    const stripe = await stripePromise

    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: priceId, quantity: 1 }], // Setting 1 for now
      successUrl: `${window.location.origin}/paymentSuccess/`,
      cancelUrl: `${window.location.origin}`,
    })
  }

  // Return
  return (
    <div className="container">
      <h1>Products</h1>
      {data &&
        data.prices.edges.map(({ node }) => {
          // Select Active products
          if (node.product.active) {
            return (
              <div key={node.id} className="products">
                <img src={node.product.images[0]} alt={node.product.name} />
                <h3>Price Id: {node.product.name}</h3>
                <p>price: ${node.unit_amount / 100}</p>
                <button
                  onClick={() => {
                    redirectToCheckout(node.id)
                  }}
                >
                  Buy
                </button>
              </div>
            )
          }
          return null
        })}
    </div>
  )
}

export default ProductList
