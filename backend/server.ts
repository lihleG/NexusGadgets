import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, paymentMethodId }: { amount: number; paymentMethodId: string } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: 'http://localhost:5173/payment-complete'
    });

    res.send({ success: true, paymentIntent });
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));


