import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/context/providers/QueryProvider";

import Header from "./components/base/header/Header";
import Footer from "./components/base/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <QueryProvider>
          <div id="root">
            <Header />
            <main className="flex flex-col">
              {children}
            </main>
            <Footer/>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
