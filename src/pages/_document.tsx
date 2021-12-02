import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { Style } from 'src/utils/Style';
import { getCssText } from 'src/utils/theme';

const metrikaCode = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(86736459, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
});`;

const globalStyles = `
* {
  box-sizing: border-box;
}

body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
`

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
          <Style id="global" text={globalStyles} />
          <Style id="stitches" text={getCssText()} />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: metrikaCode }} />
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://mc.yandex.ru/watch/86736459" style={{
                position: 'absolute',
                left: -99999
              }} alt="" />
            </div>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
