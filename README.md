# 🍔 UrbanBites — Food Delivery Web App

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://urbanbites-1-evzi.onrender.com/)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Stripe](https://img.shields.io/badge/Payments-Stripe-blueviolet)

UrbanBites is a full-stack food delivery web application built with the MERN stack. It features a customer-facing storefront, an admin dashboard for restaurant management, and secure online payments via Stripe.

---

## 🌐 Live Demo

👉 [https://urbanbites-1-evzi.onrender.com/](https://urbanbites-1-evzi.onrender.com/)

---

## 📁 Project Structure

```
UrbanBites/
├── Frontend/        # Customer-facing React app (port 5173)
├── Backend/         # Express + Node.js REST API (port 3000)
└── admin/           # Admin dashboard React app (port 5174)
```

---

## ✨ Features

### 👤 Customer App (Frontend)
- Browse food items by category with the Explore Menu
- Add / remove items from cart
- User authentication (Login / Register via popup)
- Place orders with delivery address
- Secure checkout via **Stripe**
- View past orders in My Orders
- Responsive UI

### 🛠️ Admin Dashboard
- Add new food items with image upload
- View and manage all listed food items
- Track and update order statuses

### ⚙️ Backend API
- RESTful API with Express.js
- JWT-based authentication middleware
- MongoDB database via Mongoose
- Stripe payment integration
- Multer for food image uploads

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, Context API, React Router |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB, Mongoose                   |
| Auth       | JWT (JSON Web Tokens)               |
| Payments   | Stripe                              |
| State Mgmt | React Context API                   |
| Styling    | CSS Modules                         |
| File Upload| Multer                              |
| Hosting    | Render                              |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Stripe account (for API keys)

---

### 🔧 Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the server:

```bash
npm run server
```

---

### 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

### 🖥️ Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
```

Runs on: `http://localhost:5174`

---

## 📡 API Routes

| Resource | Base Route     | Description              |
|----------|----------------|--------------------------|
| Users    | `/api/user`    | Register, Login          |
| Food     | `/api/food`    | Add, List, Remove items  |
| Cart     | `/api/cart`    | Add, Remove, Get cart    |
| Orders   | `/api/order`   | Place, Verify, Track     |

---

## 📂 Key Components

### Frontend
| Component      | Description                             |
|----------------|-----------------------------------------|
| `Navbar`       | Navigation with cart icon & login       |
| `Header`       | Hero/banner section                     |
| `ExploreMenu`  | Category filter for food items          |
| `FoodDisplay`  | Grid of food cards                      |
| `FoodItem`     | Individual food card with add-to-cart   |
| `LoginPopup`   | Modal for login/register                |
| `AppDownload`  | App download CTA section                |
| `Footer`       | Site footer                             |

### Pages
| Page          | Route         | Description                  |
|---------------|---------------|------------------------------|
| `Home`        | `/`           | Landing page                 |
| `Cart`        | `/cart`       | Cart summary                 |
| `PlaceOrder`  | `/order`      | Checkout & delivery details  |
| `Verify`      | `/verify`     | Payment verification         |
| `MyOrders`    | `/myorders`   | Order history                |

---

## 💳 Stripe Payment Flow

1. User fills in delivery details and proceeds to checkout
2. Backend creates a Stripe Checkout session
3. User is redirected to Stripe's hosted payment page
4. On success/failure, user is redirected to `/verify`
5. Backend verifies the session and updates order status

---

## 🗃️ Database Models

- **User** — name, email, hashed password, cart data
- **Food** — name, description, price, category, image
- **Order** — user ID, items, amount, address, status, payment status



---

