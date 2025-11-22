import { Metadata } from "next";
import { Nunito } from "next/font/google";
import Head from "next/head";
import { Footer } from "../widgets/footer";
import { Header } from "../widgets/header";
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
        <Head>
          <title>Лотос</title>
        </Head>
        <body className={`${nunito.variable} ${nunito.variable}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
