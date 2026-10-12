import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../../styles/globals.css";

import Providers from "../../components/providers/Providers";
import Navbar from "../../components/providers/layout/Navbar";
import Footer from "../../components/providers/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { verifyToken } from "@/src/features/auth/server/auth.actions";
import { authReducer } from "@/src/features/auth/slices/auth.slice";
import { getCartItems } from "@/src/features/cart/server/cart.actions";
import { CartValuesType } from "@/src/features/cart/slices/cart.slice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FRESCO",
  description:
    "Discover fresh, curated products at FRESCO. Shop quality products selected for you.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const isArabic = locale === "ar";

  const authStates = await verifyToken();

  let cartValues: CartValuesType = {
    cartId: null,
    status: "",
    message: "",
    numOfCartItems: 0,
    data: {
      products: [],
      totalCartPrice: 0,
    },
  };

  if (authStates.isAuthenticated === true) {
    const cartResponse = await getCartItems();

    if (cartResponse.status === "success") {
      cartValues = cartResponse;
    }
  }

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <NextIntlClientProvider>
          <Providers
            preloadState={{ authReducer: authStates, cartReducer: cartValues }}
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
