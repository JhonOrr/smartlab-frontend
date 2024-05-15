"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div style={{display:"flex"}}>
            <Sidebar />
            <div style={{width:"100%"}}>
            {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
