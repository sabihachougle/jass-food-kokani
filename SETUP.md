# Setup & Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm 9+
- A Gmail account with App Password enabled (for email receipts)
- (Optional) Twilio account for SMS receipts
- Owner's WhatsApp number: +919833987609

## Project Structure

```
jass-food-kokani/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── context/         # Cart state management
│   │   ├── data/            # Static data (products)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # TailwindCSS imports
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                  # Express backend
│   ├── routes/              # API routes
│   ├── services/            # WhatsApp, Email, SMS services
│   ├── index.js             # Express app entry
│   └── package.json
├── .env.example             # Environment template
├── package.json             # Root workspace config
└── README.md
```

## Installation

### 1. Clone or extract the project

```bash
cd jass-food-kokani
```

### 2. Install all dependencies

```bash
npm run install:all
```

This installs:
- Root dependencies (concurrently)
- Client dependencies (React, Vite, TailwindCSS, Axios)
- Server dependencies (Express, Nodemailer, Twilio, Cors)

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend port
PORT=4000

# Owner's WhatsApp number (already filled)
OWNER_WHATSAPP_NUMBER=1111111

# Gmail SMTP settings (for email receipts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Twilio SMS (leave blank to skip SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
```

### Setting up Gmail App Password

1. Enable 2-factor authentication on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Paste it into `SMTP_PASS` in your `.env`

### Setting up Twilio (optional for SMS)

1. Create a Twilio account at https://www.twilio.com/
2. Get your Account SID and Auth Token from the dashboard
3. Provision a phone number for sending SMS
4. Add these to your `.env`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890
```

## Running the Application

### Development Mode (recommended for local testing)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173 (Vite dev server with HMR)
- **Backend**: http://localhost:4000 (Express API)

### Separate terminals (for debugging)

Terminal 1 - Frontend:
```bash
npm run dev:client
```

Terminal 2 - Backend:
```bash
npm run dev:server
```

### Production Build

```bash
npm run build
```

This builds the React frontend to `client/dist`.

### Production Start

```bash
npm start
```

Runs only the backend server on the configured PORT.

## Testing the Workflow

### Test Order Flow

1. Open http://localhost:5173
2. Browse the menu and add items to cart
3. Click "Continue to Checkout"
4. Fill in your details:
   - Full Name (required)
   - Email (required)
   - Phone (optional but recommended)
   - Address, City, Pincode (required)
   - Landmark, Notes (optional)
5. Click "Place Order"
6. A WhatsApp Web/App link opens with a pre-formatted message
7. Send the message to verify the workflow
8. Email receipt is sent to your configured address

### Checking API Endpoint

```bash
curl http://localhost:4000
```

Response:
```json
{
  "status": "running",
  "service": "Jass Food and Kokani Delicacies API"
}
```

## Managing Product Images

### Setting up the Images Folder

1. Create a `images` folder in the root of your project (version control with Git):

```bash
mkdir images
```

2. Organize images by category:

```
images/
├── jass-food/
│   ├── tandoori-chicken.jpg
│   ├── frozen-samosas.jpg
│   ├── shami-kabab.jpg
│   ├── bread-wheels.jpg
│   ├── chicken-shahi-roll.jpg
│   ├── seekh-kabab.jpg
│   └── croquette.jpg
└── kokani/
    ├── duderi.jpg
    ├── nariyal-pak.jpg
    ├── sandan.jpg
    ├── puran-poli.jpg
    ├── khazoori.jpg
    ├── pelve.jpg
    └── ghavne-rava-cake.jpg
```

3. Add to `.gitignore` if you prefer (images are smaller and manageable):

```bash
# Add this line if you want to exclude images from git
# images/
```

### Updating Product Images

Edit `client/src/data/products.js` and update the `image` field for each product:

**Before (placeholder):**
```javascript
{
  id: 'sandan',
  name: 'Sandan',
  description: 'Soft, cardamom-kissed coconut sweet.',
  price: 120,
  unit: 'per kg',
  category: 'kokani',
  image: 'https://placehold.co/400x300/dfc8a1/6b5a47?text=Sandan',
}
```

**After (using local images):**
```javascript
{
  id: 'sandan',
  name: 'Sandan',
  description: 'Soft, cardamom-kissed coconut sweet.',
  price: 120,
  unit: 'per kg',
  category: 'kokani',
  image: '/images/kokani/sandan.jpg',
}
```

### Making Images Public in Vite

1. Create a `public` folder in the client directory if it doesn't exist:

```bash
mkdir client/public
```

2. Add the images folder to the public directory:

```bash
# From project root
cp -r images client/public/
```

3. Update `vite.config.js` to ensure public assets are served correctly:

```javascript
export default {
  server: {
    middlewareMode: false,
  },
  // Vite automatically serves public/ folder assets
};
```

### Image Path Convention

**For development and production:**
- Use relative paths: `/images/kokani/sandan.jpg`
- Images should be placed in `client/public/images/`

**File naming convention:**
- Use lowercase names with hyphens: `tandoori-chicken.jpg`
- Match the product ID where possible

### Image Optimization Tips

1. **Format**: Use JPG for photos, PNG for graphics with transparency
2. **Size**: Compress images to ~50-100KB each for faster loading
3. **Dimensions**: 400x300px recommended (aspect ratio 4:3)
4. **Tools**: Use tools like:
   - ImageOptim (Mac)
   - TinyJPG (online)
   - ImageMagick (command line)

### Batch Update Example

To update all product images at once:

```javascript
// client/src/data/products.js
const products = [
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken',
    description: 'Marinated and roasted, ready-to-heat classic.',
    price: 420,
    unit: 'per kg',
    category: 'jass-food',
    image: '/images/jass-food/tandoori-chicken.jpg',
  },
  // ... update remaining products similarly
];
```

### Git Workflow for Images

```bash
# Add images folder to git
git add images/
git commit -m "Add product images for jass-food and kokani categories"
git push

# Clone with images on another machine
git clone <repository-url>
# Images folder will be included automatically
```

## Deployment

### Option 1: Deploy to Vercel (Recommended)

**Frontend:**
1. Push project to GitHub
2. Connect to Vercel and select the `client` folder as root
3. Add environment variable: `VITE_API_BASE_URL=https://your-api-domain.com`

**Backend:**
1. Deploy to Heroku, Railway, or similar
2. Set environment variables on the hosting platform
3. Update `VITE_API_BASE_URL` on Vercel to point to your backend

### Option 2: Deploy to Heroku

1. Create a Procfile in the root:

```
web: npm start
```

2. Update `package.json` start script to run the server only
3. Push to Heroku:

```bash
git push heroku main
```

### Option 3: Deploy to own VPS

1. SSH into your VPS
2. Clone the repository
3. Install Node.js
4. Create `.env` with production values
5. Run:

```bash
npm install
npm run build
npm start
```

Use PM2 to manage the process:

```bash
npm install -g pm2
pm2 start server/index.js --name "jass-food-api"
pm2 save
```

## API Reference

### POST /api/order

**Request:**
```json
{
  "items": [
    {
      "id": "sandan",
      "name": "Sandan",
      "price": 120,
      "quantity": 2
    }
  ],
  "customer": {
    "name": "John Doe",
    "phone": "+919876543210",
    "email": "john@example.com"
  },
  "address": {
    "line1": "123 Main Street",
    "city": "Mumbai",
    "pincode": "400001",
    "landmark": "Near Central Park"
  },
  "notes": "Less sweet, deliver by 5pm",
  "total": 240
}
```

**Response:**
```json
{
  "orderId": "JF-20260512-456",
  "waLink": "https://wa.me/919833987609?text=...",
  "status": "success"
}
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Cart state management with Context API
- ✅ WhatsApp order deep linking
- ✅ Email receipts via Nodemailer
- ✅ SMS notifications via Twilio (optional)
- ✅ TailwindCSS styling with warm color palette
- ✅ Transient order processing (no database)
- ✅ Production-ready error handling

## Troubleshooting

### Issue: "Cannot connect to backend"
- Ensure server is running on port 4000
- Check `VITE_API_BASE_URL` in frontend environment
- Verify CORS is enabled in Express

### Issue: "Email not sending"
- Check SMTP credentials in `.env`
- Verify Gmail App Password is correct
- Check spam folder
- Review server logs for errors

### Issue: "SMS not sending"
- Ensure Twilio credentials are set in `.env`
- Verify Twilio account has balance
- Check phone number format (+1234567890)

### Issue: "WhatsApp link not opening"
- The link should open WhatsApp Web or mobile app
- On desktop: WhatsApp Web must be open first
- On mobile: WhatsApp app opens automatically
- Verify owner number is formatted correctly

## Support & Contact

- **Business WhatsApp**: +91 98339 87609
- **Instagram**: https://www.instagram.com/jassfood/
- **Facebook**: https://www.facebook.com/jassfood1/

## License

All rights reserved © Jass Food and Kokani Delicacies
