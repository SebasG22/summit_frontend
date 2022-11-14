import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className='h-full scroll-smooth bg-[#56042C] antialiased'>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}