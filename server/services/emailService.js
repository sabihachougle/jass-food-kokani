import nodemailer from 'nodemailer';

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is not complete. Check your .env file.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const buildEmailHtml = ({ heading, intro, orderId, customer, address, items, total, notes, footerNote }) => {
  const itemRows = items
    .map(
      (item) => `<tr><td style="padding: 8px 12px; border: 1px solid #e8d8c4;">${item.name} x${item.quantity}</td><td style="padding: 8px 12px; border: 1px solid #e8d8c4; text-align: right;">₹${item.price * item.quantity}</td></tr>`
    )
    .join('');

  return `
  <div style="font-family: Inter, sans-serif; color: #3b3229; background: #fcf7ee; padding: 32px;">
    <div style="max-width: 650px; margin: auto; background: white; border-radius: 24px; overflow: hidden; border: 1px solid #fdecd1;">
      <div style="background: #d98f00; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">Jass Food & Kokani Delicacies</h1>
        <p style="margin: 8px 0 0; font-size: 16px;">${heading}</p>
      </div>
      <div style="padding: 28px 32px;">
        <p style="margin: 0 0 12px;">Dear ${customer.name || 'Team'},</p>
        <p style="margin: 0 0 20px;">${intro}</p>
        <p style="margin: 0; font-weight: 700;">Order ID: ${orderId}</p>
        <p style="margin: 12px 0 0;">Delivery address: ${address}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="padding: 12px; border: 1px solid #e8d8c4; text-align: left; background: #f7efe5;">Item</th>
              <th style="padding: 12px; border: 1px solid #e8d8c4; text-align: right; background: #f7efe5;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 12px; border: 1px solid #e8d8c4; text-align: left; font-weight: 700;">Total</td>
              <td style="padding: 12px; border: 1px solid #e8d8c4; text-align: right; font-weight: 700;">₹${total}</td>
            </tr>
          </tfoot>
        </table>
        <p style="margin: 20px 0 0;">Notes: ${notes || 'None'}</p>
        <div style="margin-top: 28px; padding: 20px; background: #ffefc5; border-radius: 16px;">
          <p style="margin: 0; font-size: 14px; color: #5a4c41;">${footerNote}</p>
        </div>
        <p style="margin: 24px 0 0; font-size: 14px; color: #5a4c41;">With love, <br/>Jass Food & Kokani Delicacies</p>
      </div>
    </div>
  </div>`;
};

export async function sendEmail(payload) {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"Jass Food & Kokani Delicacies" <${process.env.SMTP_USER}>`,
    to: payload.to,
    subject: payload.subject,
    html: buildEmailHtml(payload),
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}

export async function sendOrderConfirmationEmail(payload) {
  return sendEmail(payload);
}

export async function sendOwnerReceiptEmail(payload) {
  return sendEmail(payload);
}
