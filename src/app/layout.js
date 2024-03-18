import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/store/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopCart",
  description: "ShopCart Shopping App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
              position="top-right"
              theme="dark"
              autoClose={3000}
            />
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
