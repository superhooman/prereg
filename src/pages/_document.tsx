import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'src/utils/theme';

const TITLE = 'PreReg | superhooman';
const DESCRIPTION = 'Get your perfect schedule';

const URL = 'https://prereg.superhooman.co/';
const OPENGRAPH = `${URL}opengraph.png`;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
          <title>{TITLE}</title>
          <meta name="title" content={DESCRIPTION} />
          <meta name="description" content={DESCRIPTION} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={URL} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={OPENGRAPH} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={URL} />
          <meta property="twitter:title" content={TITLE} />
          <meta property="twitter:description" content={DESCRIPTION} />
          <meta property="twitter:image" content={OPENGRAPH} />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#272727" />
          <meta name="msapplication-TileColor" content="#272727" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="keywords" content="Registrar, Nazarbayev University, Courses, Online, Tool" />
          <meta name="author" content="superhooman" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
