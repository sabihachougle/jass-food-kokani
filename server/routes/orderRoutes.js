import express from 'express';
import { sendOrderConfirmationEmail, sendOwnerReceiptEmail } from '../services/emailService.js';
import { sendOrderSms } from '../services/smsService.js';

const router = express.Router();

const makeOrderId = () => {
  const date = new Date().toISOString().split('T')[0].replaceAll('-', '');
  const rand = Math.floor(Math.random() * 900 + 100);
  return `JF-${date}-${rand}`;
};

router.post('/', async (req, res) => {
  const { items, customer, address, notes, total } = req.body;
  if (!items || !customer || !address) {
    return res.status(400).json({ message: 'Invalid order payload.' });
  }

  const orderId = makeOrderId();
  const ownerEmail = process.env.OWNER_EMAIL;

  const shippedAddress = `${address.line1}, ${address.city} - ${address.pincode}${address.landmark ? `, Landmark: ${address.landmark}` : ''}`;

  const customerEmailPayload = {
    to: customer.email,
    subject: `Your Order Confirmation – ${orderId}`,
    heading: 'Order Confirmation',
    intro: 'Thank you for ordering from Jass Food and Kokani Delicacies. Here are your order details:',
    orderId,
    customer,
    address: shippedAddress,
    items,
    total,
    notes,
    footerNote: 'We have received your order and will begin preparing it shortly.',
  };

  const ownerEmailPayload = {
    to: ownerEmail,
    subject: `New Order Received – ${orderId}`,
    heading: 'New Order Received',
    intro: 'A new order has been placed. The details are below:',
    orderId,
    customer,
    address: shippedAddress,
    items,
    total,
    notes,
    footerNote: `Order ID ${orderId} has been submitted through the website.`,
  };

  try {
    await sendOrderConfirmationEmail(customerEmailPayload);
  } catch (error) {
    console.warn('Customer email send failed:', error.message);
  }

  if (ownerEmail) {
    try {
      await sendOwnerReceiptEmail(ownerEmailPayload);
    } catch (error) {
      console.warn('Owner email send failed:', error.message);
    }
  } else {
    console.warn('OWNER_EMAIL is not configured. Owner receipt not sent.');
  }

  if (customer.phone) {
    try {
      await sendOrderSms({ name: customer.name, phone: customer.phone, orderId, total });
    } catch (error) {
      console.warn('SMS send failed:', error.message);
    }
  }

  return res.json({ orderId, status: 'success' });
});

export default router;
