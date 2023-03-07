const stripe = require('stripe')(process.env.SECRET_KEY)

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body

  // This is just testing. In production, we will compare the values with the database as values can be easily changed from the front-end
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })

  res.json({
    clientSecret: paymentIntent.client_secret,
  })
}

module.exports = stripeController
