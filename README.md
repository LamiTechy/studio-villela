<h1 align="center">Women's Fashion Store 👗🛒</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

[Video Tutorial on Youtube](https://youtu.be/sX57TLIPNx8)

About This Project:

- 🚀 Supabase App Backend
- 💳 Stripe Checkout Integration
- 🔐 Supabase Auth with Refresh Tokens
- 👗 Women's Fashion Catalog and Categories
- 🛒 Shopping Cart backed by Supabase
- 🧾 Order tracking in Supabase
- 🏷️ Coupon Code validation and gift coupons
- 👑 Admin product management
- 📊 Analytics using Supabase queries
- 🎨 UI built with React, Tailwind, Vite
- ☁️ File uploads using Supabase Storage

### Setup .env files

Backend `.env` example:

```bash
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Frontend `.env` example:

```bash
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Run locally

```shell
npm install
npm install --prefix frontend
```

Start the backend:

```shell
npm run dev
```

Start the frontend:

```shell
npm run dev --prefix frontend
```

Build for production:

```shell
npm run build
```

Start the production server:

```shell
npm run start
```
