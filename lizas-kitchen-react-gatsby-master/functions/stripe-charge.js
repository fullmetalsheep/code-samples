/* eslint-disable import/no-unresolved */
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.handler = async function stripeRequest(event) {
  const { tokenId, email, name, description, amount } = JSON.parse(event.body);

  const customer = await stripe.customers.create({
    description: email,
    source: tokenId,
  });

  await stripe.charges.create({
    customer: customer.id,
    amount,
    name,
    description,
    currency: 'aud',
  });
};
