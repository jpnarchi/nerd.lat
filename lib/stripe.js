import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    typescript: false,
});

// stripe login

// stripe listen --forward-to localhost:3000/api/stripe/webhook

// stripe trigger checkout.session.completed