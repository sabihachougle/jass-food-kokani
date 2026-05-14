# 🚀 QUICK START GUIDE

## Step 1: Configure Environment (2 minutes)

```bash
cd C:\Users\sabih\jass-food-kokani
cp .env.example .env
```

Then edit `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

### Getting Gmail App Password:
1. Go to https://myaccount.google.com/apppasswords
2. Select Mail → Windows Computer
3. Copy the 16-char password into `SMTP_PASS`

---

## Step 2: Start Development Server

```bash
npm run dev
```

This runs:
- **Frontend**: http://localhost:5173 ← Open this in browser
- **Backend**: http://localhost:4000

---

## Step 3: Test the Order Flow

1. Open http://localhost:5173 in your browser
2. Click **Menu**
3. Add some sweets to cart
4. Click **Cart** button → review items
5. Click **Continue to Checkout**
6. Fill in the form:
   - Name: Your Name
   - Email: your-email@gmail.com
   - Phone: 9876543210 (optional)
   - Address: Your Address
   - City: Mumbai
   - Pincode: 400001
7. Click **Place Order**
8. A WhatsApp link opens (on desktop: copy to phone, on mobile: app opens)
9. Check your email for the receipt

---

## Project Files Overview

| File | Purpose |
|------|---------|
| **client/src/App.jsx** | Main React router |
| **client/src/pages/Home.jsx** | Landing page |
| **client/src/pages/Menu.jsx** | Product catalog |
| **client/src/pages/Checkout.jsx** | Order form |
| **client/src/components/CartDrawer.jsx** | Shopping cart UI |
| **client/src/context/CartContext.jsx** | State management |
| **server/index.js** | Express app entry |
| **server/routes/orderRoutes.js** | POST /api/order |
| **server/services/emailService.js** | Email receipts |
| **server/services/whatsappService.js** | WhatsApp linking |

---

## 📋 Checklist for Production

- [ ] Configure Gmail credentials in `.env`
- [ ] Test email receipt delivery
- [ ] (Optional) Set up Twilio for SMS
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Heroku/Railway
- [ ] Update `VITE_API_BASE_URL` in Vercel to production API
- [ ] Test full order flow on production
- [ ] Share link with customers

---

## 🎨 Customization Tips

**Change Business Name:**
- Search "Jass Food" in all files
- Update in: Navbar, Home page, emails

**Change Owner WhatsApp Number:**
- Update `OWNER_WHATSAPP_NUMBER` in `.env`
- Update in: Home page contact section

**Add/Remove Products:**
- Edit `client/src/data/products.js`
- Update prices and descriptions there

**Change Colors:**
- Edit `client/tailwind.config.js`
- Modify the `colors` section

---

## 🆘 Common Issues

**"Email not sending"**
- Verify Gmail App Password is correct (16 chars)
- Check spam folder
- Look at server logs for errors

**"WhatsApp link not working"**
- On desktop: requires WhatsApp Web to be open first
- On mobile: app should open automatically
- Verify number in `.env` has country code (91 for India)

**"Cannot reach backend"**
- Ensure `npm run dev:server` is running on port 4000
- Check `.env` exists with correct values
- Verify firewall isn't blocking port 4000

---

## 📚 Full Documentation

- **SETUP.md** — Complete setup & deployment
- **PROJECT_COMPLETE.md** — Architecture & features
- **README.md** — Project overview

---

## ✨ What's Ready Now

✅ Full React frontend with cart and checkout  
✅ Express API with email & WhatsApp integration  
✅ All dependencies installed  
✅ Responsive design (mobile-first)  
✅ Error handling & form validation  
✅ Order ID generation & confirmation page  

**You're ready to test!** 🎉
