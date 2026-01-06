# Server-Rendered E-commerce Product Management Dashboard

# SSR E-Commerce Product Management Dashboard

A high-performance, server-rendered E-commerce Admin Dashboard built with Next.js 15, Tailwind CSS v4, and MongoDB. 

## 🚀 Live Demo
**Link:** [https://ssr-ecommerce-three.vercel.app](https://ssr-ecommerce-three.vercel.app)

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB (with Mock Fallback for Demo)
- **Authentication:** NextAuth.js
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion

## ✨ Features
- **Secure Authentication:** Protected admin routes using NextAuth.
- **Product CRUD:** Effortlessly Create, Read, Update, and Delete inventory items.
- **Data Visualization:** Interactive charts showing stock levels and inventory value.
- **Responsive Design:** Premium Glassmorphism UI that works on all devices.
- **Persistence:** Global state management for demo mode and MongoDB integration.

## 🔑 Admin Credentials (Demo)
- **Email:** `admin@example.com`
- **Password:** `admin123`

## ⚙️ Setup Instructions
1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=any_random_string
   NEXTAUTH_URL=http://localhost:3000
   ```
4. **Run development server:**
   ```bash
   npm run dev
   ```

## 🎥 Demo Video
[Link to Demo Video]

### Building for Production
```bash
npm run build
npm start
For testing purposes, you can use the following credentials if no admin exists in the database:
*   **Email**: `admin@example.com`
*   **Password**: `admin123`

## Deployment
Deployed on Vercel: [Insert Live Link Here]
Demo Video: [Insert Video Link Here]
