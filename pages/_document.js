import { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
    return (
        <Html>
            <Head>
                <link
                    rel='shortcut icon'
                    href='favicon.png'
                    type='image/x-icon'
                />
            </Head>
            <body className='scroll-smooth antialiased overflow-hidden'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
