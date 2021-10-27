// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
  // Custom product
  const schoolBag = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "School Bag",
        images: [
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2Nob29sJTIwYmFnfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        ],
      },
      unit_amount: 2000, //It means 20$
    },
    quantity: 1,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [schoolBag],
      mode: "payment",
      success_url: `http://localhost:8888/paymentSuccess/`,
      cancel_url: `http://localhost:8888/`,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
