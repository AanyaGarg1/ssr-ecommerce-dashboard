import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "E-commerce Product Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-50/50 min-h-screen`}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:pl-64">
              <div className="container mx-auto p-4 md:p-8 pt-6 max-w-7xl">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
