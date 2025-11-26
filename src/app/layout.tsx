import { AuthProvider } from "@/src/shared/api/context/auth-context";
import { TanstackQueryProvider } from "@/src/shared/context/tanstack";
import { Toaster } from "@/src/shared/ui/toast";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const nunito = Nunito({
  variable: "--nunito-font",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Лотос",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <AuthProvider>
          <TanstackQueryProvider>
            <Head>
              <title>Лотос</title>
            </Head>
            <body className={`${nunito.variable} ${nunito.variable}`}>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </body>
          </TanstackQueryProvider>
        </AuthProvider>
      </html>
    </>
  );
}
