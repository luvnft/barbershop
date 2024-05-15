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
  title: "Hairapp",
  description: "Book your hair appointment with the best stylist near you.",
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
    <html lang="en" className={`dark`}>
      <Head>
        <meta name="author" content="The Wizard of Hahz" />
        <meta property='og:title' content='Hairapp' />
        <meta
          property='og:description'
          content='Book your hair appointment with the best stylist near you.'
        />
        <meta property='og:url' content='https://hairapp.arvrtise.com' />
        <meta property='og:type' content='website' />
        <link rel="icon" type="image/x-ico" sizes="3any" href="icon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="../public/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/images/favicon-16x16.png" />
        <link rel="manifest" href="../public/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#C60C30" />
        <meta name="theme-color" content="#C60C30" />
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
            })(window, document, "clarity", "script", "mchmvlg47z");`,
            }}
        />
        <GoogleTagManager gtmId="GTM-M27JKNWM" />
        <GoogleAnalytics gaId="G-LB3Q260S6V" />
      </body>
    </html>
  );
}
