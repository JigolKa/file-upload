import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>File Upload</title>
        <meta
          name="description"
          content="Upload your files here, hosted on Vercel!"
        />
        <meta
          name="twitter:description"
          content="Upload your files here, hosted on Vercel!"
        />
        <meta
          name="og:description"
          content="Upload your files here, hosted on Vercel!"
        />
        <meta property="twitter:title" content="File Upload" />
        <meta property="og:title" content="File Upload" />
      </Head>
      <Script
        async
        strategy="afterInteractive"
        src="https://analytics.umami.is/script.js"
        data-website-id="1b2ddd8d-3a04-46d7-b38c-2ecdd39fd7b7"
      />
      <Toaster position="bottom-center" reverseOrder={true} />
      <Component {...pageProps} />
    </>
  );
}
