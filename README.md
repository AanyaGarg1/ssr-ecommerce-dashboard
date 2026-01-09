# Aura Admin | Premium SSR E-Commerce Dashboard
**Aanya Garg**
A high-performance, next-generation E-commerce Admin Dashboard featuring a premium glassmorphic design system. Built with Next.js 15, Tailwind CSS v4, and MongoDB.

## 🚀 Live Demo
**Link:** [https://ssr-ecommerce-three.vercel.app](https://ssr-ecommerce-three.vercel.app)

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB Atlas
- **Image Hosting:** Cloudinary (Secure Storage)
- **Authentication:** NextAuth.js
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod (Multi-step)
- **Animations:** Framer Motion

## ✨ Features
- **Secure Authentication:** Protected admin routes using NextAuth.
- **Multi-Step Product CRUD:** Effortlessly Create, Read, Update, and Delete inventory items using a high-end multi-step wizard.
- **Secure Image Upload:** Direct integration with Cloudinary for scalable image management.
- **Data Visualization:** Interactive charts showing stock levels and inventory value.
- **Recent Orders Dashboard:** Dynamic, animated order tracking with color-coded status indicators and real-time updates.
- **Responsive Design:** Premium Glassmorphism UI that works on all devices.

## 🔑 Admin Credentials (Demo)
- **Email:** `admin@example.com`
- **Password:** `AdmiN_7788!@#`

## ⚙️ Setup Instructions
1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file with:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=any_random_string
   NEXTAUTH_URL=http://localhost:3000

   # Cloudinary (New)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Run development server:**
   ```bash
   npm run dev
   ```

## 🎥 Demo Video
https://drive.google.com/file/d/1rZYGA4sN9R-y5gcQ5GBAIiPz8r9GDL4-/view?usp=sharing

---
*Developed for Project Submission by Aanya Garg*
