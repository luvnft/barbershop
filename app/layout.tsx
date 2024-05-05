import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import AuthProvider from "./_providers/auth";
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Toaster } from "./_components/ui/sonner";
export const metadata: Metadata = {
  title: "Barbershop",
  description: "Vamos agendar um corte hoje?",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="pt-Br" className={`dark`}>
      <Head>
        <meta name="author" content="Gustavo Borda @guh_borda" />
        <meta property='og:title' content='Barbershop Flax' />
        <meta
          property='og:description'
          content='Agende seu corte nas melhores barbearias'
        />
        <meta property='og:url' content='https://barbershop-flas.vercel.app' />
        <meta property='og:type' content='website' />
        <link rel="icon" type="image/x-ico" sizes="3any" href="icon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="../public/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/images/favicon-16x16.png" />
        <link rel="manifest" href="../public/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#603cba" />
      </Head>
      <body className={inter.className}>

        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
        <Toaster />
        <script
          dangerouslySetInnerHTML={
            {
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "lzbmnayw8r");`,
            }}
        />
        <GoogleTagManager gtmId="GTM-K4QXKWBK" />
        <GoogleAnalytics gaId="G-BJ24K2NVRJ" />
      </body>
    </html>
  );
}
