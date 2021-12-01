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
