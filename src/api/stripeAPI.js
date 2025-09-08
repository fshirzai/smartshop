import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export const stripeAPI = {
  getStripe: () => stripePromise,
};
