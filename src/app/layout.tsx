import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/Navbar";
import OpenGraphHome from "@/assets/opengraph.png";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL( env.META_BASE_URL || "http://localhost:3000"),
  title: "IniEcommerce",
  description: "We love your wallet",
  openGraph: {
    images: OpenGraphHome.src,
    url: "/",
    type: "website",
  },
  creator: "Yaqub Wiraatmaja",
  publisher: "Yaqub Wiraatmaja",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="m-auto">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
