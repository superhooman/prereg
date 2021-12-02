import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'src/utils/theme';

const metrikaCode = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(86736459, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
});`

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
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
