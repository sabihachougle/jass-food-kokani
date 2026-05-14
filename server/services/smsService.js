import twilio from 'twilio';

export async function sendOrderSms({ name, phone, orderId, total }) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    console.warn('Twilio SMS credentials not configured. Skipping SMS send.');
    return null;
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const message = `Hi ${name}, your order #${orderId} from Jass Food has been received! Total: ₹${total}. We'll confirm shortly. – Jass Food & Kokani Delicacies`;

  const result = await client.messages.create({
    body: message,
    from: TWILIO_FROM_NUMBER,
    to: phone,
  });

  return result;
}
