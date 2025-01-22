import localFont from "next/font/local";
import "./globals.css";
import { rubik } from "@/font";
import Header from "./_component/Header";
import Footer from "./_component/Footer";
import { ReduxProvider } from "@/ReduxProvider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Kaal Tools",
  description: "Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} bg-white text-[#060809]  antialiased`}
      >
        <Header/>
        <ReduxProvider>{children}</ReduxProvider>        
        <Footer/>
      </body>
    </html>
  );
}
