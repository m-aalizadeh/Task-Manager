import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple Todo app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <nav className="bg-blue-600 p-4 ">
          <div className="container mx-auto flex justify-between">
            <Link href="/tasks">
              <span className="text-white text-xl font-bold cursor-pointer">
                Todo App
              </span>
            </Link>
            <Link href="/addTask">
              <span className="text-white cursor-pointer">Add Task</span>
            </Link>
          </div>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
