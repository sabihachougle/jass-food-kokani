# 🚀 Deployment & Integration Guide

## Part 1: Host on Netlify

### Prerequisites
- GitHub account with repository pushed
- Netlify account (free tier available)
- Node.js 18+ installed locally

### Step 1: Prepare Your Project for Netlify

#### 1a. Create a production build locally
```bash
cd C:\Users\sabih\jass-food-kokani
npm run build
```

This creates a `dist` folder with optimized production code.

#### 1b. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Jass Food website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jass-food-kokani.git
git push -u origin main
```

### Step 2: Deploy Frontend to Netlify

#### Option A: Connect GitHub to Netlify (Recommended)

1. **Go to Netlify**
   - Visit https://app.netlify.com
   - Sign up / Log in with GitHub

2. **Create New Site**
   - Click "New site from Git"
   - Select GitHub → authorize
   - Choose your `jass-food-kokani` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `client/dist`
   - Click "Deploy site"

#### Option B: Manual Deploy (Drag & Drop)
1. Run `npm run build` locally
2. Go to https://app.netlify.com
3. Drag the `client/dist` folder onto Netlify
4. Your site goes live instantly!

### Step 3: Deploy Backend to Netlify Functions (or Railway/Render)

Since Netlify can't run Node.js 24/7, use:

#### Option A: Netlify Functions (Serverless)
Backend runs as serverless functions - **No continuous cost**, pay only for usage.

**Setup:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create functions folder
mkdir netlify/functions

# Move your server code
cp server/index.js netlify/functions/api.js
cp server/routes/* netlify/functions/
```

**Update `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "client/dist"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

**Update frontend API URL:**
In `client/src/components/CheckoutForm.jsx`:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL || '.netlify/functions/api';
```

#### Option B: Railway or Render (Recommended for Full Backend)
These are better for running Express 24/7.

**Using Railway:**
1. Push code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Add environment variables (.env)
6. Railway generates a live URL automatically

**Using Render:**
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Build command: `cd server && npm install`
5. Start command: `node index.js`
6. Add environment variables
7. Deploy!

### Step 4: Connect Frontend to Backend

Update your frontend's API URL:

**In `.env.local` (frontend):**
```env
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

**Or in `vite.config.js`:**
```javascript
export default {
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://your-backend-url.railway.app')
  }
}
```

---

## Part 2: WhatsApp Integration (Pay-Per-Message Model)

### Prerequisites
- WhatsApp Business Account
- Twilio Account (handles WhatsApp messages)
- Business phone number verified

### Step 1: Set Up Twilio Account

1. **Create Twilio Account**
   - Go to https://www.twilio.com
   - Sign up (free $15 trial credit)
   - Verify phone number

2. **Enable WhatsApp Sandbox**
   - Go to Console → Messaging → Try it out → Send an SMS
   - Or go to WhatsApp section directly
   - Join sandbox: Send message "join [code]" to Twilio's WhatsApp number

3. **Get Credentials**
   - Account SID: Found in console dashboard
   - Auth Token: Found in console dashboard
   - WhatsApp Number: Provided by Twilio sandbox

### Step 2: Update Backend (.env file)

```env
# Existing
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password

# Add WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
OWNER_WHATSAPP_NUMBER=+919833987609
```

### Step 3: Create WhatsApp Service

**Create `server/services/whatsappService.js`:**

```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendOrderNotification(order) {
  try {
    const message = await client.messages.create({
      body: `🎉 New Order from JASS Food!\n\n` +
            `Order ID: ${order.orderId}\n` +
            `Customer: ${order.customer.name}\n` +
            `Phone: ${order.customer.phone}\n` +
            `Items: ${order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}\n` +
            `Total: ₹${order.total}\n` +
            `Address: ${order.address.line1}, ${order.address.city}`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.OWNER_WHATSAPP_NUMBER}`
    });
    
    console.log(`WhatsApp sent: ${message.sid}`);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error: error.message };
  }
}

async function sendCustomerConfirmation(order) {
  try {
    const message = await client.messages.create({
      body: `✓ Order Confirmed!\n\n` +
            `Order ID: ${order.orderId}\n` +
            `Total: ₹${order.total}\n` +
            `We'll prepare your sweets with care!\n` +
            `Contact us: +919833987609`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${order.customer.phone}`
    });
    
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendOrderNotification, sendCustomerConfirmation };
```

### Step 4: Install Twilio SDK

```bash
cd server
npm install twilio
```

### Step 5: Integrate with Order Route

**Update `server/routes/orderRoutes.js`:**

```javascript
const express = require('express');
const router = express.Router();
const { sendOrderEmail } = require('../services/emailService');
const { sendOrderNotification, sendCustomerConfirmation } = require('../services/whatsappService');
const { v4: uuidv4 } = require('uuid');

router.post('/order', async (req, res) => {
  try {
    const { items, customer, address, total, notes } = req.body;
    
    const orderId = `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const order = {
      orderId,
      items,
      customer,
      address,
      total,
      notes,
      timestamp: new Date().toISOString(),
    };

    // Send email to owner
    await sendOrderEmail(order);

    // Send WhatsApp to owner
    await sendOrderNotification(order);

    // Send WhatsApp to customer (if they have WhatsApp)
    if (customer.phone) {
      await sendCustomerConfirmation(order);
    }

    res.json({ 
      success: true, 
      orderId,
      message: 'Order received! Check your email and WhatsApp for confirmation.'
    });

  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order' 
    });
  }
});

module.exports = router;
```

### Pricing: WhatsApp (Twilio)
- **Inbound messages**: Free
- **Outbound messages**: $0.0079 per message (approx ₹0.65)
- **Monthly minimum**: No minimum, pay only for what you use
- **Per month estimate**: ~50 orders × ₹0.65 = ₹32.50/month

---

## Part 3: Gmail Integration (SMTP)

### Prerequisites
- Gmail account
- Gmail "App Password" (not regular password)

### Step 1: Generate Gmail App Password

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com
   - Left menu → Security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select: Mail → Windows Computer
   - Google generates a 16-character password
   - Copy this password

### Step 2: Update .env File

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # 16-char app password (with spaces)
SENDER_EMAIL=your-email@gmail.com
SENDER_NAME=Jass Food - Kokani Delicacies
```

### Step 3: Email Service Already Configured

Your `server/services/emailService.js` already handles Gmail. Verify it's set up:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOrderEmail(order) {
  const emailContent = `
    <h2>Order Received! ✓</h2>
    <p>Order ID: <strong>${order.orderId}</strong></p>
    <p><strong>Items:</strong></p>
    <ul>
      ${order.items.map(item => `<li>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</li>`).join('')}
    </ul>
    <p><strong>Total: ₹${order.total}</strong></p>
    <p>Thank you for ordering from Jass Food!</p>
  `;

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: order.customer.email,
    subject: `Order Confirmation #${order.orderId}`,
    html: emailContent,
  });
}

module.exports = { sendOrderEmail };
```

### Step 4: Install Email Dependencies

```bash
cd server
npm install nodemailer
```

### Step 5: Test Email

Add test endpoint to verify:

```javascript
router.post('/test-email', async (req, res) => {
  try {
    await sendOrderEmail({
      orderId: 'TEST-123',
      items: [{ name: 'Jalebi', quantity: 1, price: 100 }],
      customer: { email: 'your-email@gmail.com', name: 'Test User' },
      total: 100,
    });
    res.json({ success: true, message: 'Test email sent!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

## Complete Deployment Checklist

### Frontend (Netlify)
- [ ] Push code to GitHub
- [ ] Connect repo to Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `client/dist`
- [ ] Custom domain (optional)

### Backend (Railway/Render)
- [ ] Create account
- [ ] Connect GitHub repo
- [ ] Add all environment variables
- [ ] Get backend URL
- [ ] Update frontend VITE_API_BASE_URL

### Gmail Setup
- [ ] Enable 2FA on Gmail
- [ ] Generate App Password
- [ ] Add to backend .env
- [ ] Test email sending

### WhatsApp Setup
- [ ] Create Twilio account
- [ ] Join WhatsApp Sandbox
- [ ] Get Twilio credentials
- [ ] Add to backend .env
- [ ] Install Twilio SDK
- [ ] Update order routes
- [ ] Test WhatsApp messages

---

## Environment Variables Summary

**`.env` (Backend)**
```env
# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SENDER_EMAIL=your-email@gmail.com
SENDER_NAME=Jass Food - Kokani Delicacies

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
OWNER_WHATSAPP_NUMBER=+919833987609
```

**`.env.local` (Frontend)**
```env
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

---

## Monthly Cost Estimate

| Service | Cost |
|---------|------|
| Netlify Frontend | Free (generous free tier) |
| Railway Backend | $5/month (or Railway credits) |
| Gmail | Free |
| Twilio WhatsApp | ~₹30/month (50 orders × ₹0.65) |
| **Total** | ~$5/month + SMS costs |

---

## Testing

### Test Email Flow
1. Go to your website
2. Add items to cart
3. Fill checkout form
4. Submit order
5. Check email (inbox + spam folder)

### Test WhatsApp Flow
1. Same as email
2. Check owner's WhatsApp for notification
3. Verify customer receives confirmation

### Monitor Logs
- **Netlify**: Deploys & Functions tab
- **Railway**: Logs tab in dashboard
- **Backend Console**: Real-time logs

Done! Your app is now live with automated notifications. 🎉
