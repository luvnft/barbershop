import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import AuthProvider from "./_providers/auth";
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Barbershop",
  description: "HAHA",
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
        <link rel='icon' href='../public/logo.svg' />
        <script
          dangerouslySetInnerHTML={
            {
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K4QXKWBK');`,
            }}
        />
      </Head>
      <body className={inter.className}>

        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
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
      </body>
    </html>
  );
}
